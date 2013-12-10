/*grid.js*/

function Grid(width, height, size, color){
    this.w = width+size;
    this.h = height+size;
    this.size = size;
    this.color = color;
    this.draw = Grid_draw;
}

function Grid_draw(grid, buffer){
    var c = buffer.ctx;
    c.beginPath();
    c.strokeStyle = grid.color;
    var sx = buffer.cornerx;
    var sy = buffer.cornery;
    var sx2 = sx - (sx % grid.size); 
    var sy2 = sy - (sy % grid.size);
    //vertical
    for(var i=0;i<grid.w;i+=grid.size){
        c.moveTo(sx2+i, sy);
        c.lineTo(sx2+i,sy+grid.h);
    }
    //horizontal
    for(var i=0;i<grid.h;i+=grid.size){
        c.moveTo(sx, sy2+i);
        c.lineTo(sx+grid.w,sy2+i);
    }
    c.stroke();
    c.closePath();
}

function Boundary(buffer, factor){
    this.w = buffer.w * factor * 2;
    this.h = buffer.h * factor * 2;
    this.sizeh = buffer.h * factor;
    this.sizew = buffer.w * factor;
    this.draw = Boundary_draw;
}

function Boundary_draw(boundary, buffer){
    var c = buffer.ctx;
    c.strokeStyle = "red";
    c.lineWidth = 5;
    c.beginPath();
    c.strokeRect(-boundary.sizew, -boundary.sizeh, boundary.w, boundary.h);
    
}

