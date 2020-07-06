'use strict';


let Game = function(){ 
    let cw = can.width;
    let ch = can.height; 
    let score = 0;
    let starRating;
    let lives = 4;
    this.scl=0.4;
    this.ship_img = document.getElementById('ship');
    this.invader_img = document.getElementById('enemy');
    this.missile_img = document.getElementById('laser');
    this.enemy_laser = document.getElementById('enemy_laser');
    this.counter = document.getElementById('moveCounter');//to count the score
    let starElements = document.getElementsByClassName('star');
    this.starElementsArray = [...starElements];//collect star elements in array
    this.lives = document.getElementById('lives');
    this.modalElement = document.getElementById('gameOverModal');//access the data in the class
    this.totalScore = document.getElementById('totalNoInvader');//show total movements 
    this.finalStarRatingElement = document.getElementById('finalStarRating');//shows star rating
    let sendScore = document.querySelector('#brown-button');
    this.id ={w: 82*this.scl, h: 84*this.scl, rows:3, cols:8, gap:10};
    this.sd ={ w: 112*this.scl , h:75*this.scl};
    this.ship={x:cw/2-this.sd.w/2 , y:ch-10-this.sd.h , w:this.sd.w, h:this.sd.h};
    this.shipSpeed=4; 
    this.shipMissiles = new Array();   
    this.shipMissileSpeed= 3;
    this.invaders =new Array();  
    this.invadersMissiles = new Array();
    this.invaderMissileSpeed =3;
    this.missileWidth = 3;
    this.missileHeight = 20;
    this.completed = false;
    this.invadersRange ={x:0,w:0};
    //ctx.drawImage(ship,10,10,);
    

    this.init =function(){

        let dd =this.id;
        this.invadersRange.w = dd.cols*dd.w + dd.cols*dd.gap;
        this.invadersRange.x = cw/2- this.invadersRange.w/2;
        let yoffset = 10;
        let xoffset =this.invadersRange.x;
        for(let x =0; x < dd.cols ; x++){
            for(let y=0 ; y<dd.rows ; y++){
                let invader={x:x*dd.w+x*dd.gap , y:y*dd.h+y*dd.gap , w:dd.w , h:dd.h};
                invader.x+=xoffset;
                invader.y+=yoffset;
                this.invaders.push(invader);
            }
        }

    }

    this.draw =function(ctx){
        //invader drawing
        for(let i=0 ; i< this.invaders.length ;i++){
            let invader =this.invaders[i];
            drawImg(ctx , this.invader_img , invader.x , invader.y , invader.w ,invader.h);
        }
        //ship  drawing
        drawImg(ctx , this.ship_img, this.ship.x, this.ship.y, this.ship.w, this.ship.h);
    }


    this.update = function(ctx){
        if(this.completed)return;
        this.updateShipMovement();
        this.draw(ctx);
        this.updateMissiles(ctx);
        this.updateInvadersBehaviour();       
        this.checkGameCompleted();
        
    }



    this.updateShipMovement = function(){
        if(leftkey){
            this.ship.x-= this.shipSpeed;
        }
        if(rightkey){
            this.ship.x+= this.shipSpeed;
        }
        if(this.ship.x < this.invadersRange.x){
            this.ship.x = this.invadersRange.x;
        }
        if(this.ship.x + this.ship.w > this.invadersRange.x + this.invadersRange.w){
            this.ship.x = this.invadersRange.x + this.invadersRange.w - this.ship.w;
        }
    }

    this.shipShootMissile =function(){
        let missile ={x: this.ship.x + this.ship.w/2 - this.missileWidth/2 , y:this.ship.y - this.missileHeight};
        this.shipMissiles.push(missile);
    }


    this.updateMissiles = function(ctx){
        //ship missiles
        for(let i =0;i <this.shipMissiles.length ; i++){
            let missile = this.shipMissiles[i];
            missile.y-= this.shipMissileSpeed;
            for(let j =0; j< this.invaders.length; j++){
                let inv =this.invaders[j];
                if(rectColl(missile.x, missile.y, this.missileWidth, this.missileHeight,inv.x , inv.y,inv.w,inv.h)){
                    this.shipMissiles.splice(i,1);
                    this.invaders.splice(j,1);
                    this.moveCounter();                  
                    break;
                }
            }
            drawImg(ctx, this.missile_img,  missile.x , missile.y, this.missileWidth, this.missileHeight);

        }
        //invader missiles
        for(let i =0 ; i<this.invadersMissiles.length ; i++ ){
            let missile = this.invadersMissiles[i];
            missile.y+= this.invaderMissileSpeed;
          
            if(rectColl(missile.x , missile.y , this.missileWidth , this.missileHeight , this.ship.x , this.ship.y , this.ship.w , this.ship.h)){ 
                this.invadersMissiles.splice(i,1) ;
                lives--;
                this.lives.innerHTML =  ' Lives left ' +  lives ;
                this.checkGameOver();
                break;
            }

        drawImg(ctx , this.enemy_laser, missile.x , missile.y , this.missileWidth , this.missileHeight);   
        }
    }
    
    this.updateInvadersBehaviour = function(){
        let shoot =Math.random();
        if(shoot <0.03){
            let invader = this.invaders[Math.floor(Math.random()* this.invaders.length)];
            let missile = {x:invader.x + invader.w/2 - this.missileWidth/2, y:invader.y + invader.h};
            this.invadersMissiles.push(missile);                  
        }
    }

    this.checkGameCompleted = function(){
        if(this.invaders.length <1){
            this.completed = true;
            this.endGame();
           // alert("<Game Completed>");
        }
    } 

    
    this.checkGameOver =function(){
        if(lives < 1){
            this.completed = true;
            this.endGame();
            //alert("< GAME Over>"); 
        }
    }

    //score check
    this.moveCounter = function(){
        score++;
        console.log( score);
     this.counter.innerHTML =  ' Your Score ' +  score ;
     //start rating check
    if(score > 0 && score <=8){
		
	    for(let i=0; i<5; i++) {
            if(i < 1) {
                this.starElementsArray[i].style.opacity = 1;
            }            
        }
    } else if(score > 8 && score <= 12) {
        for(let i=0; i<5; i++) {
            if(i <2) {
                this.starElementsArray[i].style.opacity = 1;
            }
        }
    } else if(score > 12 && score <= 16) {
        for(let i=0; i<5; i++) {
            if(i <3) {
                this.starElementsArray[i].style.opacity = 1;
            }
        }
    } else if(score > 16 && score <= 20) {
        for(let i=0; i<5; i++) {
            if(i < 4) {
                this.starElementsArray[i].style.opacity = 1;
            }
        }
    } else if(score  > 20 && score <= 24){
        for(let i=0; i<5; i++) {
            if(i < 5) {
                this.starElementsArray[i].style.opacity = 1;
            }
        }
    }
	
    }
    
    this.endGame = function () {
        starRating = document.querySelector('.rating').innerHTML;
        //show modal on game end
        this.modalElement.style.display = 'block';
        //show  moves and finalStarRating in Modal
        this.totalScore.innerHTML = score;
        console.log(score);
        this.finalStarRatingElement.innerHTML = starRating;
    }

 

    //sending score in jason format////////////////////////
    const absenden = () => {
        
        // Falls mehrere Headers kann der Headers-Konstruktor verwendet werden
        let kopfdaten = new Headers();
        kopfdaten.append('content-type', 'application/json' );

        let absendenRequest = new Request(
            '/contentSichern',
            {  
                method: 'post',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({
                score
                
                })
            }
        )
            
        fetch(absendenRequest).then(
            response => response.text()
        ).then(
            console.log
        ).catch(
            console.log
        ) 
    }

    // Eventlistener
    sendScore.addEventListener('click', absenden);
   

};

