'use strict';
let ctx;
let leftkey  =false;
let rightkey =false;
let clearColor = '#121212';

   

window.addEventListener("DOMContentLoaded", evt => {
   
    let c = document.getElementById('can');
    let game;
    


function init(){  
    window.addEventListener("keyup",onKeyUp);
    window.addEventListener("keydown",onKeyDown); 
    ctx = c.getContext('2d');
    game= new Game();
    game.init();
    update();
}



function update(){
   clearCanvas(ctx);
   game.update(ctx); 
   requestAnimationFrame(update);
}



function onKeyDown(e){
    let keycode=e.keyCode;
    //left
    if(keycode==37){
        leftkey=true;
    }
    //right
    if(keycode==39){
        rightkey=true;
    }
    //space
    if(keycode==32){
        game.shipShootMissile();
    }
} 

function onKeyUp(e){
    let keycode=e.keyCode;
    //left
    if(keycode==37){
        leftkey=false;
    }
    //right
    if(keycode==39){
        rightkey=false;
    }
}


    init();
    
/*     const refreshButton =document.querySelector( '.refreshButton');
    const refreshPage = ()=>{location.reload()};
    refreshButton.addEventListener('click',refreshPage); */

});