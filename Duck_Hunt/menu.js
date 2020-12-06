running = true
var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

function on_my_click(){
    clearInterval(interval_id)
    running = false
}

document.body.onmousedown = on_my_click;

function draw_menu(){
    ctx.beginPath();

    ctx.font = "60px Georgia";
    ctx.fillText("Instructions: ", canvas.width/2 - 150, canvas.height * 0.2)

    ctx.font = "30px Georgia"
    ctx.fillText("Click to shoot the bird", canvas.width/2 - 150, canvas.height * 0.35)
    ctx.fillText("You have 3 shots before it flies away", canvas.width/2 - 225, canvas.height * 0.45)

    ctx.font = "60px Georgia";
    ctx.fillText("Click the mouse to begin", canvas.width/2 - 300, canvas.height * 0.75)

    ctx.fillStyle = "#eee";
    ctx.fill();
    ctx.closePath();

}

var fps = 60
var interval_id = setInterval(draw_menu, 1000/fps);
