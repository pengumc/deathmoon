function get_angle(x1,y1,x2,y2){
    return(Math.atan2(y2 - y1, x2 - x1));
}


/*
version 0.1:
    single sector
    single dumb enemy type
    single weapon
    firing costs energy, energy recovery is increased when standing still
    waves of enemies, increasing in number.
    highscore in cookie
    pos/ori in 2d Hmatrix => waaay too much overhead
0.2
    animated object sprites

- predrawn object canvasses || o.predrawn = predraw_something(this) ||
- moveable objects:
    - player
    - friendlies
    - enemies
    - weaponsfire
    - explosions
    - scrap
- render stack
    - move stuff || o.move(o, dt) ||
        - player
        - enemies 
            - explode on player collision
        - friendlies
        -explosions
        - weaponsfire
            - explode on kill
        - scrap
            - attach to tractorbeam when in range? / pickup
        - tick stuff || o.tick(o, dt) ||
            - other
    - draw stuff || o.draw(o, buffer) ||
        - other (grid, boundary, other unmoveables)
        - player
        - friendlies
        - enemies
        -explosions
        - weaponsfire
        - scrap
        - HUD
    - cleanup
    

*/
var SECTORFACTOR = 0.9;
var g_boundary;
var g_render_stack = new Array(); //functions to call
var g_other = new Array();
var g_enemies = new Array();
var g_explosions = new Array();
var g_weaponsfire = new Array();
var g_scrap = new Array();

var g_player; //player
var g_ts = (new Date()).getTime(); //timestamp
var g_highscore = get_highscore_from_cookie() || 0;
var g_wave = 0;

//=====================
// START
//=====================
function start(){
    //create main objects   
    var b = new Buffer(800,480);
    g_player = new Player();
    g_boundary = new Boundary(b, SECTORFACTOR);
    //populate initial render_stack
    g_other.push(new Grid(b.w, b.h, 100, "#555"));
    g_other.push(g_boundary);
    
    g_render_stack.push(function deverything(){draw_stuff(b);});
    g_render_stack.push(move_stuff);
    g_render_stack.push(cleanup);
    
    //setup events
    b.canvas.addEventListener("mousemove", mmove);
    b.canvas.addEventListener("click", click);
    window.setInterval(function render(){
        recenter(g_player, b);
        b.ctx.clearRect(b.cornerx, b.cornery, b.w, b.h);
        for(var f,i=0;f=g_render_stack[i];i++){
            f();
        }
    }, 10);
    window.setInterval(function(){g_player.regen();}, 500)
    new_wave();
}

function new_wave(){
    g_wave++;
    spawn(Math.pow(g_wave,2));
}


//=====================
// CLEANUP
//=====================
function cleanup(){
    //enemies
    for(var o,i=0;o=g_enemies[i];i++){
        if(o.destroyed){
            if (g_player.closest == o) g_player.closest = 0;
            g_enemies.splice(i,1);
            i--;
        }
    }
    if(g_enemies.length < 1) new_wave();
    
    //explosions
    for(var o,i=0;o=g_explosions[i];i++){
        if(o.destroyed){
            g_explosions.splice(i,1);
            i--;
        }
    }
    //weaponsfire
    for(var o,i=0;o=g_weaponsfire[i];i++){
        if(o.destroyed){
            g_weaponsfire.splice(i,1);
            i--;
        }
    }
    //scrap
    for(var o,i=0;o=g_scrap[i];i++){
        if(o.destroyed){
            g_scrap.splice(i,1);
            i--;
        }
    }
    //other
    for(var o,i=0;o=g_other[i];i++){
        if(o.destroyed){
            g_other.splice(i,1);
            i--;
        }
    }
    
    //player death!
    if(g_player.hp <= 0){
        DIE();
    }
}

function DIE(){
    if(g_player.died) return;
    explode(g_player);
    g_player.speedx = 0;
    g_player.speedy = 0;
    g_player.hp = 0;
    g_player.died = true;
    g_other.push(new Text("You died, hit refresh to try again.", -100,0));
    setTimeout(function(){
        g_render_stack.splice(g_render_stack.indexOf(move_stuff), 1);
        g_player.hp = 0;
        if (g_player.scrap >= g_highscore){
            g_highscore = g_player.scrap;
            set_highscore(g_player.scrap);
        }
    }, 1000);
}


//=====================
// SPAWN
//=====================
function spawn(n, x, y){
    x = x || -g_boundary.sizew +  Math.random() * g_boundary.w;
    y = y || -g_boundary.sizeh +  Math.random() * g_boundary.h;
    for (var i=0;i<n;i++){
        var a = new Enemy_purplesquare(x, y);
        g_enemies.push(a);
    }
}
