'strict mode';

 function clearCanvas(ctx){
    ctx.fillStyle=clearColor;
    ctx.fillRect(0 , 0 , can.width , can.height); 
       
 }


// function drawRect(cc,x,y,w,h,color){
//     cc.fillStyle=color;
//     cc.fillRect(x,y,w,h);
// }


function drawImg(ctx,img,x,y,w,h){
    ctx.drawImage(img,x,y,w,h);
    
}

function rectColl(ax,ay,aw,ah,bx,by,bw,bh){
    if (ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ah + ay > by) {
        return true;
    }
    return false;
}

// var Vec = function(x,y){
//     this.x =x;
//     this.y =y;
// }