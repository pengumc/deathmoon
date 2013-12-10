/*
enemies.js
*/

//=====================
// purple_square
//=====================
function Enemy_purplesquare(x, y){
    this.x = x || 0;
    this.y = y || 0;
    this.d = 0.0;
    this.speedx = (-1 + Math.random()*2)*50
    this.speedy = (-1 + Math.random()*2)*50;
    this.hp = 2;
    this.side = 1;
    this.size = 10;
    this.destroyed = false;
    this.draw = purplesquare_draw;
    this.predraw = predraw_purplesquare(this); //unused atm
    this.move = move_basicXY;
}

function purplesquare_draw(o, buffer){
    var c = buffer.ctx;
    c.fillStyle = "purple";
    c.beginPath();
    c.fillRect(o.x-5, o.y-5, 10, 10);
}