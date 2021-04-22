
const canvas = document.getElementById("canvas");
// canvas.width = window.innerWidth-40;
// canvas.height = 600;
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");
let draw_color = "black";
let draw_width = "2";
let is_drawing  = false;
let path = [];
let index = -1;





canvas.addEventListener("mousedown",start,);
canvas.addEventListener("mousemove",draw);
canvas.addEventListener("mouseup",stop);
function start(event){
    is_drawing = true;
    ctx.beginPath();
    let rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    ctx.moveTo(x,y);
    socket.emit("start",{x,y})
    event.preventDefault();
}
function draw(event){
    if(is_drawing){
      let rect = canvas.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top
        ctx.lineTo(x,y);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        socket.emit("drawing",{x,y})
    }
    event.preventDefault();
}
function stop(event){
    if(is_drawing){
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    event.preventDefault();
    if(event.type != "mouseout"){
        path.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        index+=1;
    }

    // console.log(path)
}

function changeColor(element){
    draw_color = element.style.background;
}
function Clear(){
    canvas.height = canvas.height;
}
function Undo(){
    if(index <= 0){
        Clear();
    }else{
        index-=1;
        path.pop();
        ctx.putImageData(path[index],0,0);
    }
}

var socket = io();
socket.on("start",(obj) => {
  ctx.beginPath();
  ctx.moveTo(obj.x,obj.y);
})

socket.on("drawing",(obj) => {
  ctx.lineTo(obj.x,obj.y);
  ctx.strokeStyle = draw_color;
  ctx.lineWidth = draw_width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
})
