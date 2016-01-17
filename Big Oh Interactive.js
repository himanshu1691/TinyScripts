/* equation 1 => x+10 => f(n)
equation 2 => x   => g(n)
F(x) is O(g(x)) if there exist 2 constants 'c' and 'xstart'\n such that f(x) <= c*g(x) for all x,x>=xstart
This example is explanation of Big-O notation described on:  https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation
*/

var xstart = 0;
var c =1;
var f = function(n) {
            var y = n + 10;
            return y;
        };

var g = function(n) {
            var y = n;
            return y;
        };
        
var titleFont = createFont("Times", 16);
var labelFont = createFont("Arial", 10);
var scatterSize = 3;
var dashSize = 4;
var backgroundColour = color(245, 245, 255);

var borderBottom = 25;
var borderLeft = 25;  

var scatterGraph = { x: 15, y: 20,
                    width: 350, height: 300,
                    xMin: 1, xMax: 20,
                    yMax: (0.5*20) * (0.5*20),
                    xlabel: "X->",
                    ylabel: "Y->",
                    colour1: color(250, 0, 0, 120),
                    colour2: color(0, 0, 250, 120)
};


var drawScatterGraph = function(c,xstart, display) {
    var gx = display.x + borderLeft;
    var gy = display.y + display.height - borderBottom;
    var gw = display.width - borderLeft;
    var gh = display.height - borderBottom;
    var c = c;
    var scaleX = gw / (display.xMax - display.xMin);
    var scaleY = gh / display.yMax;
    var dy = display.yMax / 5;
    var i, n, x, y;  
    
   
        // Clear background
        noStroke();
        fill(backgroundColour);
        noStroke();
        rect(display.x-10, display.y-10,
             display.width+20, display.height+12);
        
       
        
        // Axis labels
        fill(10, 10, 20);
        textFont(labelFont, 12);
        textAlign(CENTER, BASELINE);
        text(display.xlabel, gx + 0.5 * gw, gy+borderBottom);
        
        translate(gx - borderLeft+4, gy - gh/2);
        rotate(270);
        text(display.ylabel, 0, 0);
        resetMatrix();
        
        // Axis units
        textFont(labelFont, 10);
        strokeWeight(1);
        for (i=1; i<20; i+=2) {
            x = gx + 2 + (i - 0.5) * scaleX + 2;
            text(i + display.xMin, x, gy + borderBottom - 12);
            line(x, gy, x, gy + 3);
     
        }

        
        
        textAlign(RIGHT, CENTER);
        for (i = 0; i <= display.yMax; i += dy) {
            y = gy - i * scaleY;
            text(i, gx - 4, y);
            line(gx, y, gx-3, y);
        }
    
  

    
    
    
    // Axes
    stroke(10, 10, 20);
    strokeWeight(2);
    line(gx, gy+1, gx+gw, gy+1);
    line(gx, gy, gx, gy - gh+1);
    
    //PLOT equation for F(n)
    for (i=0; i<20; i+=0.05) {
            x = gx + 2 + (i - 0.5) * scaleX + 2;
            strokeWeight(1.5);
            stroke(0, 51, 255);
            var p = f(i);
            y = gy - p * scaleY;
            point(x,y);
        }
    
    //PLOT equation for g(n)
    for (i=xstart; i<20; i+=0.05) {
            stroke(224, 110, 90);
            x = gx + 2 + (i - 0.5) * scaleX + 2;
            var q = c*g(i);
            y = gy - q * scaleY;
            point(x,y);
        }

    
};

var Button = function(label) {
    this.text = label;
    
    this.w = label.length * 18;
    this.h = 33;
    
    this.draw = function(x, y) {
        this.x = x - this.w/2;
        this.y = y;

        var col, txtcol;
        if (this.mouseOver()) {
            col = color(80, 80, 80);
            txtcol = color(250, 250, 50);
        } else {
            col = color(200, 200, 200);
            txtcol = color(0, 0, 0);
        }
        
        fill(col);
        strokeWeight(2);
        stroke(250, 250, 250);
        rect(this.x, this.y, this.w, this.h, 7);

        fill(txtcol);
        textFont(createFont("impact", 20), 26);
        textAlign(CENTER, CENTER);
        text(this.text, this.x + this.w/2, this.y + this.h/2);

    };
    
    this.mouseOver = function() {
        return mouseX >= this.x && mouseX <= this.x+this.w &&
               mouseY >= this.y && mouseY <= this.y+this.h;
    };
};


        
var lessButtonC = new Button("<");
var moreButtonC = new Button(">");
var lessButtonN0 = new Button("<");
var moreButtonN0 = new Button(">");

var mouseReleased = function() {
    if (lessButtonC.mouseOver()) {
        c = c -1;
        if(c<1){
        c =1;
        }
    }
    
    else if(moreButtonC.mouseOver()){
        c = c + 1;
        if(c>10){
        c =1;
        }
    }
    
    if (lessButtonN0.mouseOver()) {
        xstart = xstart -1;
        if(c<1){
        c =1;
        }
    }
    
    else if(moreButtonN0.mouseOver()){
        xstart = xstart + 1;
        if(c>10){
        c =1;
        }
    }
};
    

var draw = function() {
    noStroke();
    background(214, 188, 188);
    fill(backgroundColour);
    drawScatterGraph(c,xstart,scatterGraph);
    fill(6, 27, 163);
    text("F(x) = x +10",300,50);
    fill(230, 25, 25);
    text("G(x) = x",300,70);
    fill(0, 0, 0);
    text("F(x) is O(g(x)) if there exist 2 constants 'c' and 'xstart'\n such that f(x) <= c*g(x) for all x,x>=xstart",330,335);
    lessButtonC.draw(80,350);
    moreButtonC.draw(160,350);
    text("C="+c,120,370);
    lessButtonN0.draw(230,350);
    moreButtonN0.draw(350,350);
    text("Xstart="+xstart,290,370);
    

};