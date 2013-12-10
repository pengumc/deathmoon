//=====================
// BUFFER
//=====================
function Buffer(w, h){
    this.canvas = document.createElement('canvas');
    this.h = Math.floor(h);
    this.w = Math.floor(w);
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 1;
    this.ctx.font = "12pt sans-serif"
    this.ctx.save();
    this.ctx.transform(1,0,0,1,this.w/2,this.h/2);    
    this.cornerx = -this.w/2;
    this.cornery = -this.h/2;
    this.canvas.style.backgroundColor = "#000000";
    document.body.appendChild(this.canvas);
}


//=====================
// recenter
//=====================
function recenter(t, b){
    b.ctx.restore();
    b.ctx.save();
    b.ctx.transform(1,0,0,1,b.w/2,b.h/2)
    b.ctx.translate(-t.x, -t.y);
    b.cornerx = t.x-b.w/2;
    b.cornery = t.y-b.h/2;
    
}


//=====================
// DRAW STUFF
//=====================
function draw_stuff(buffer){
    //other
    for(var o,i=0;o=g_other[i];i++) o.draw(o, buffer);
    //player
    if(!g_player.died) draw_object(g_player, buffer);
    //enemies
    for(var o,i=0;o=g_enemies[i];i++) o.draw(o, buffer);
    //explosions
    for(var o,i=0;o=g_explosions[i];i++) o.draw(o, buffer);
    //weaponsfire
    for(var o,i=0;o=g_weaponsfire[i];i++) o.draw(o, buffer);
    //scrap
    for(var o,i=0;o=g_scrap[i];i++) o.draw(o, buffer);
    //HUD
    draw_HUD(buffer);
}


//=====================
// DRAW OBJECT
//=====================
function draw_object(o, buffer){
    buffer.ctx.save();
    buffer.ctx.translate(o.x, o.y);
    buffer.ctx.rotate(-o.heading);
    buffer.ctx.drawImage(o.predraw, -o.size, -o.size);
    buffer.ctx.restore();

}   


function draw_HUD(buffer){
    draw_player_hp(buffer);
    draw_player_energy(buffer);
    draw_score(buffer);
    draw_enemy_indicator(buffer);
}

function draw_scrap(o, buffer){
    draw_object(o, buffer);
    if(o.tractor){
        buffer.ctx.strokeStyle = "#0075ff";
        buffer.ctx.lineWidth = 1;
        buffer.ctx.beginPath();
        buffer.ctx.moveTo(g_player.x, g_player.y);
        buffer.ctx.lineTo(o.x, o.y);
        buffer.ctx.stroke();
    }
}

function draw_text(o, buffer){
    var x = g_player.x + o.x;
    var y = g_player.y + o.y;
    buffer.ctx.fillStyle = o.color;
    buffer.ctx.fillText(o.text, x, y);
}


//=====================
// DRAW PLAYER HP
//=====================
function draw_player_hp(buffer){
    buffer.ctx.beginPath();
    buffer.ctx.fillStyle = "#ccc";
    var x = g_player.x - buffer.w/2 + 10;
    var y = g_player.y + buffer.h/2 - 36;
    buffer.ctx.fillRect(x,y, 100, 10);
    buffer.ctx.fillStyle = "#00ff00";
    buffer.ctx.fillRect(x,y, g_player.hp/g_player.maxhp*100, 10);
}

//=====================
// DRAW PLAYER ENERGY
//=====================
function draw_player_energy(buffer){
    buffer.ctx.beginPath();
    buffer.ctx.fillStyle = "#ccc";
    var x = g_player.x - buffer.w/2 + 10;
    var y = g_player.y + buffer.h/2 - 20;
    buffer.ctx.fillRect(x,y, 100, 10);
    buffer.ctx.fillStyle = "#0075ff";
    buffer.ctx.fillRect(x,y, g_player.energy/g_player.maxenergy*100, 10);
}

function draw_score(buffer){
    buffer.ctx.beginPath();
    buffer.ctx.fillStyle = "#00ff00";
    var x = g_player.x - buffer.w/2 + 10;
    var y = g_player.y - buffer.h/2 + 20;
    buffer.ctx.fillText("highscore: "+g_highscore, x, y);
    buffer.ctx.fillText("score: "+g_player.scrap, x, y+16);
}

function draw_enemy_indicator(buffer){
    var o;
    var drawit = false;
    if(o = g_player.closest){
        if (o.x < buffer.cornerx || o.x > buffer.cornerx + buffer.w) {
            drawit = true;
        }else if (o.y < buffer.cornery || o.y > buffer.cornery + buffer.h){
            drawit = true;
        }
    }
    if(drawit){
        buffer.ctx.strokeStyle = "#f00";
        buffer.ctx.lineWidth = 1;
        buffer.ctx.beginPath();
        buffer.ctx.moveTo(g_player.x, g_player.y);
        buffer.ctx.lineTo(o.x, o.y);
        buffer.ctx.stroke();
    }
}