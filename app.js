const canvas = document.getElementsByClassName("canvas")[0];
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("color");
const brush = document.getElementsByClassName("range")[0];
const mode = document.getElementsByClassName("btn")[0];
const save = document.getElementsByClassName("btn")[1];

const INITIAL_COLOR = "#000000";
const CANVAS_WIDTH = document.getElementsByClassName("canvas")[0].offsetWidth;
const CANVAS_HEIGHT = document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

startPainting = () => painting = true;

stopPainting = () => painting = false;

onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

changeColor = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

changeBrush = (event) => {
    ctx.lineWidth = event.target.value;
}

changeBtn = () => {
    if(filling) {
        filling = false;
        mode.innerHTML = "FILL";
    } else {
        filling = true;
        mode.innerHTML = "PAINT";

    }
}

onMouseClick = () => {
    if(filling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

onLoadCM = (event) => {
    event.preventDefault();
}

onSave = (event) => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "My Painting";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", onMouseClick);
    canvas.addEventListener("contextmenu", onLoadCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(brush){
    brush.addEventListener("input", changeBrush);
}

if(mode) {
    mode.addEventListener("click", changeBtn);
}

if(save) {
    save.addEventListener("click", onSave);
}