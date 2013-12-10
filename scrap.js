/*scrap.js*/

function Scrap(parent){
    this.x = parent.x;
    this.y = parent.y;
    if (parent.move == move_basic){
        this.speedx = parent.speed * Math.cos(parent.heading);
        this.speedy = parent.speed * Math.sin(parent.heading);
    }else if (parent.move == move_basicXY){
        this.speedx = parent.speedx;
        this.speedy = parent.speedy;
    }
    this.heading = Math.random()*Math.PI*2;
    this.speed = 10 + Math.random()*10;
    this.size = 3+Math.ceil(Math.random() * parent.size/2);
    this.d = 0;
    this.lifetime = 10.0;
    this.destroyed = false;
    this.tractor = false;
    this.move = move_scrap;
    this.predraw = predraw_scrap(this);
    this.draw = draw_scrap;
}

function Scrap_collect(o){
    o.destroyed = true;
    g_player.scrap += o.size;
}
