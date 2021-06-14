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
    ctx.textAlign = "center"
    ctx.font = "60px Georgia";
    ctx.fillText("Instructions: ", canvas.width/2, canvas.height * 0.15)

    ctx.font = "30px Georgia"
    ctx.fillText("Press Space to shoot a laser", canvas.width/2, canvas.height * 0.25)
    ctx.fillText("Use A/D or ←/→ to move", canvas.width/2, canvas.height * 0.4)
    ctx.fillText("Destroy the enemies before they reach the bottom of the screen!", canvas.width/2, canvas.height * 0.55)

    ctx.font = "60px Georgia";
    ctx.fillText("Click the mouse to begin", canvas.width/2, canvas.height * 0.85)

    ctx.fillStyle = "#eee";
    ctx.fill();
    ctx.closePath();

}

var fps = 60
var interval_id = setInterval(draw_menu, 1000/fps);
