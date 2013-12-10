/*weapons.js*/
//=====================
// LASER
//=====================
function Laser(parent, target){
    this.srcx = parent.x;
    this.srcy = parent.y;
    this.x = parent.x;
    this.y = parent.y;
    this.parent = parent;
    this.target = target;
    this.destroyed = false;
    this.heading = get_angle(parent.x, parent.y, target.x, target.y);
    this.side = 4;
    this.speed = 500;
    if (parent.move == move_basic){
        this.speedx = parent.speed * Math.cos(parent.heading);
        this.speedy = parent.speed * Math.sin(parent.heading);
    }else if (parent.move == move_basicXY){
        this.speedx = parent.speedx;
        this.speedy = parent.speedy;
    }
    this.dmg = 1;
    this.range = 250;
    this.lifetime = this.range / this.speed; //seconds
    this.move = move_laser;
    this.draw = draw_laser;
}

function draw_laser(o, buffer){
    buffer.ctx.beginPath();
    buffer.ctx.fillStyle = "yellow";
    buffer.ctx.fillRect(o.x-2, o.y-2, 4, 4);
}
