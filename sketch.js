var cells=[];
var rows;
var columns;
var size=40;
var stack=[];
var current;
var slider
function setup(){
    createCanvas(800,800);
    slider=createSlider(10,40,2);
    rows=width/size;
    columns=height/size;
    for(var i=0;i<rows;i++){
        var temprow=[];
        for(var j=0;j<columns;j++){
            temprow.push(new Cell(i,j));
        }
        cells.push(temprow)
    }
    stack.push(cells[0][0]);
    current=cells[0][0];
    current.visited=true;
}
function choose_neighbour(){
    var validCells=[];
    for(var i=-1;i<=1;i++){
        for(var j=-1;j<=1;j++){
            var tempi=current.i+i;
            var tempj=current.j+j;
            if(tempi>=0 && tempi<rows && tempj>=0 && tempj<columns && (i==0 || j==0)){
                // valid cell
                if(!cells[tempi][tempj].visited){
                    validCells.push(cells[tempi][tempj])
                }
            }
        }
    }
    if(validCells.length>0){
        var index=floor(random(validCells.length));
        var neighbour=validCells[index];
        if(current.i==neighbour.i && current.j+1==neighbour.j){
            current.right=false;
            neighbour.left=false;
        }
        if(current.i==neighbour.i && current.j-1==neighbour.j){
            current.left=false;
            neighbour.right=false;
        }
        if(current.i-1==neighbour.i && current.j==neighbour.j){
            current.top=false;
            neighbour.bottom=false;
        }
        if(current.i+1==neighbour.i && current.j==neighbour.j){
            current.bottom=false;
            neighbour.top=false;
        }
        return [true,neighbour];
    }
    else{
        return [false];
    }
}
function draw(){
    frameRate(slider.value());
    background(0);
    if(stack.length>0){
        var neigh=choose_neighbour();
        if(neigh[0]){
            stack.push(neigh[1]);
            current=neigh[1];
            current.visited=true;
        }
        else{
            current=stack.pop();
        }
    }
    else{
        console.log("Done");
        noLoop();
    }
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            cells[i][j].show();
        }
    }
    stroke(0,255,0);
    fill(0,255,0);
    rect(current.x+10,current.y+10,20,20);
    stroke(255);
    noFill();
    rect(0+2,0+2,width-4,height-4);
}
