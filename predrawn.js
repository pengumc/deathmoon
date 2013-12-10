/*
predrawn.js
  
*/

function predraw_player(player){
    var cv = document.createElement("canvas");
    cv.height = player.size*2;
    cv.width = player.size*2;
    var ctx = cv.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "gray"
    ctx.arc(player.size, player.size, player.size, 0, 2*Math.PI);
    ctx.fill();
    return(cv);
    // ctx.beginPath();
    // ctx.fillStyle = "white"
    // ctx.fillText(Math.floor(p.x*10)/10+ "   " + Math.floor(p.y*10)/10, p.x-30, p.y+40);
}

function predraw_purplesquare(o){
    var cv = document.createElement("canvas");
    cv.height = o.size;
    cv.width = o.size;
    var ctx = cv.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "purple"
    // ctx.fillRect(0,0,o.size, o.size);
    ctx.arc(0, 0, o.size, 0, Math.PI*2);
    ctx.fill();
    return(cv);
}

function predraw_scrap(o){
    var cv = document.createElement("canvas");
    cv.height = o.size*2;
    cv.width = o.size*2;
    var ctx = cv.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#ccc"
    var phi,x,y,r;
    for(var i=0;i<6;i++){
        phi = i * 2 * Math.PI/5 + Math.random()*Math.PI/3;
        r = Math.random()*o.size/2+o.size/2;
        x = Math.cos(phi)*r+o.size;
        y = Math.sin(phi)*r+o.size;
        if(i==0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.fill();
    return(cv);
}
