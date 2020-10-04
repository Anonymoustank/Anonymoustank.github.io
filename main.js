var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var x = canvas.width/2;
var y = window.innerHeight * 0.8;
var dx = 2;
var dy = -2;
var ctx = canvas.getContext("2d");
var audio = new Audio('Audio/shoot.wav');
audio.volume = 0.1
audio.play()
function draw_player(){
    ctx.beginPath();
    var player = ctx.rect(x, y, 75, 30);
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_player()
    x += dx
    y += dy
}
var fps = 100
setInterval(draw, 1000/fps);