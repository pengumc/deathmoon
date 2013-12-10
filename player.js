//=====================
// Player
//=====================
function Player(){
    this.x = 0.0;
    this.y = 0.0;
    this.hp = 100;
    this.maxhp = this.hp;
    this.energy = 30;
    this.maxenergy = this.energy;
    this.side = 0; //player, enemy, friendly, scrap, fire
    this.size = 10; //radius
    this.speedx = 0;
    this.speedy = 0;
    this.scrap = 0;
    this.tractorrange = 100;
    this.closest
    this.destroyed = false;
    this.died = false;
    this.predraw = predraw_player(this);
    this.move = move_basicXY;
    this.regen = Player_regen;
}

function Player_regen(){ //every half second
    if (g_player.speedx == 0 && g_player.speedy == 0) g_player.energy += 2;
    else g_player.energy += 1;
    if(g_player.energy > g_player.maxenergy) g_player.energy = g_player.maxenergy;
}

function Text(t, x,y, color, lifetime){
    this.x = x || 0;
    this.y = y || 0;
    this.text = t;
    this.destroyed = false;
    this.lifetime = lifetime;
    this.color = color || "#00ff00";
    this.draw = draw_text;
}

