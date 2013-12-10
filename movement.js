/*
movement.js
*/

function move_stuff(){
    //update timestamp
    var n = (new Date()).getTime();
    var dt = (n - g_ts)/1000; //in seconds
    g_ts = n;
    
    // player
    g_player.move(g_player, dt);
    
    // enemies 
    var lowd = 1e10;
    for(var o,i=0;o=g_enemies[i];i++){
        o.move(o, dt);
        // - explode on player collision
        if(o.d - o.size <= g_player.size){
            explode(o);
            g_player.hp -= o.hp;
        }
        //set target for player
        if (o.d <= lowd){
            g_player.closest = o;
            lowd = o.d;
        }
    }
    
    //explosions
    for(var o,i=0;o=g_explosions[i];i++) o.move(o, dt);
    
    // - friendlies
    
    // - weaponsfire
    for(var o,i=0;o=g_weaponsfire[i];i++) o.move(o, dt);
        //explode on impact
    
    // - scrap
    for(var o,i=0;o=g_scrap[i];i++) o.move(o, dt);
    
    //tick other stuff
    tick_stuff(dt);
    
}

function tick_stuff(dt){
    for(var o,i=0;o=g_other[i];i++) if(o.tick) o.tick(o, dt);
}


function move_basic(o, dt){
    var tx, ty;
    var c = Math.cos(o.heading);
    var s = Math.sin(o.heading);
    tx = o.x + o.speed * c * dt;
    ty = o.y + o.speed * s * dt;
    //check sector boundary
    if (Math.abs(tx) < g_boundary.sizeh) o.x = tx;
    else o.heading = o.heading - Math.PI * 0.5
    if (Math.abs(ty) < g_boundary.sizew) o.y = ty;
    else o.heading = o.heading - Math.PI * 0.5
    //update d
    o.d = Math.sqrt(Math.pow(o.x-g_player.x,2)+Math.pow(o.y-g_player.y,2));
}


function move_basicXY(o, dt){
    var tx,ty;
    tx = o.x + o.speedx * dt;
    ty = o.y + o.speedy * dt;
    //check boundary
    if (Math.abs(tx) < g_boundary.sizew) o.x = tx;
    else o.speedx = -o.speedx;
    if (Math.abs(ty) < g_boundary.sizeh) o.y = ty;
    else o.speedy = -o.speedy;
    //update d
    o.d = Math.sqrt(Math.pow(o.x-g_player.x,2)+Math.pow(o.y-g_player.y,2));
}


function move_expart(o, dt){
    o.x = o.x + (o.speed * Math.cos(o.heading)+o.speedx) * dt;
    o.y = o.y + (o.speed * Math.sin(o.heading)+o.speedy) * dt;
    o.r -= dt*o.decay;
    if(o.r <= 0) o.destroyed = true;
}


function move_laser(o, dt){
    //move
    o.x = o.x + (o.speed * Math.cos(o.heading)+o.speedx) * dt;
    o.y = o.y + (o.speed * Math.sin(o.heading)+o.speedy) * dt;
    //check for hit
    var d = Math.sqrt(Math.pow(o.x - o.target.x, 2) + 
        Math.pow(o.y - o.target.y, 2));
    if (d <= o.target.size*2){
        o.destroyed = true;
        o.target.hp -= o.dmg
        if(o.target.hp <= 0) explode(o.target);
    }
    //check lifetime
    o.lifetime -= dt;
    if (o.lifetime < 0) o.destroyed = true;
}

function move_scrap(o, dt){
    if(o.destroyed) return;
    o.x = o.x + (o.speed * Math.cos(o.heading)+o.speedx) * dt;
    o.y = o.y + (o.speed * Math.sin(o.heading)+o.speedy) * dt;
    //check lifetime
    o.lifetime -= dt;
    if (o.lifetime < 0) o.destroyed = true;
    o.d = Math.sqrt(Math.pow(o.x-g_player.x,2)+Math.pow(o.y-g_player.y,2));
    if(o.d < g_player.tractorrange) {
        if(o.d - o.size < g_player.size){
            //collect
            Scrap_collect(o);
        }else{
            o.tractor = true;
            o.speedx = 0;
            o.speedy = 0;
            o.heading = get_angle(o.x, o.y, g_player.x, g_player.y);
            o.speed = 100;
        }
    }else{
        o.tractor = false;
    }
}
