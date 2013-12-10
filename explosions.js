/*explosions.js*/

function explode(o){
    o.destroyed = true;
    var n = 20+Math.floor(Math.random()*10*o.size);
    for(var i=0;i<n;i++){
        g_explosions.push(new ExPart(o));
    }
    n = Math.floor(Math.random()*4);
    for (var i=0;i<n;i++){
        g_scrap.push(new Scrap(o));
    }
}

function ExPart(parent){
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
    this.speed = 50 + Math.random()*50;
    this.r = Math.random() * parent.size*1.5;
    this.decay = parent.size / 0.3;
    this.destroyed = false;
    this.color = Math.random()*2>1? "#fc0":"#555";
    this.move = move_expart;
    this.draw = draw_explosion;
}


function draw_explosion(o, buffer){
    if(!o.destroyed){
        buffer.ctx.beginPath();
        buffer.ctx.fillStyle = o.color;
        buffer.ctx.arc(o.x, o.y, o.r, 0, Math.PI*2);
        buffer.ctx.fill();
    }
}
