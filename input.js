function mmove(e, b){
    if(g_player.destroyed) return;
    var dx = (e.clientX - this.offsetLeft) - this.width/2;
    var dy = (e.clientY - this.offsetTop) - this.height/2;
    if (Math.abs(dx) > g_player.size){
        g_player.speedx = dx;
    }else g_player.speedx = 0;
    if (Math.abs(dy) > g_player.size){
        g_player.speedy = dy;
    }else g_player.speedy = 0;
    
}

function click(e){
    if (g_player.closest != 0){
        if (g_player.energy > 0){
            g_player.energy -= 1;
            g_weaponsfire.push(new Laser(g_player, g_player.closest));
        }
    }
}