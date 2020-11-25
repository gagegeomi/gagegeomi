const canvas = document.getElementsByTagName('canvas')[0];
canvas.style ="border:1px solid #000000; height:100%";
const ctx = canvas.getContext('2d');
const img = new Image;
img.src = "test2.svg"

var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');

img.onload = function() {
  canvas.width = this.width;
  canvas.height = this.height;
  trackTransforms(ctx);
  redraw();
  addCanvasEvent(canvas);
 } 

function trackTransforms(ctx) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
  }

function redraw() {
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    ctx.restore(); 
    ctx.drawImage(img,0,0); 
}


function pan(deltaX, deltaY) {
    var pt;
    pt.x = lastX + deltaX;
    pt.y = lastY + deltaY;
    return pt;
  }

function addCanvasEvent(canvas) {
    var lastX=canvas.width/2, lastY=canvas.height/2;
    var dragStart,dragged;

    canvas.addEventListener('mousedown',function(evt){
        lastX = evt.offsetX;
        lastY = evt.offsetY;
        dragStart = ctx.transformedPoint(lastX,lastY);
        dragged = false;
    },false);

    canvas.addEventListener('mousemove',function(evt){
        dragged = true;
        evt.preventDefault()
        if(dragStart){
            ctx.translate( - lastX + evt.offsetX, - lastY + evt.offsetY);
            redraw();
        }
        lastX = evt.offsetX;
        lastY = evt.offsetY;
    },false);

    canvas.addEventListener('mouseup',function(evt){
        dragStart = null;
        if (!dragged) zoom(evt.shiftKey ? -1: 1 );
    },false);

    var scaleFactor = 1.10;

    var zoom = function(clicks){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x,pt.y);
        var factor = Math.pow(scaleFactor,clicks);
        ctx.scale(factor,factor);
        ctx.translate(-pt.x,-pt.y);
        redraw();
    }


    var handleScroll = function(evt){
        var delta = evt.wheelDelta ? evt.wheelDelta/300 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };

    canvas.addEventListener('mousewheel', handleScroll, false);

}
