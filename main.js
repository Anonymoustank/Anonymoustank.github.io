var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var x = canvas.width/2;
var y = window.innerHeight * 0.8;
var dx = 4;
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var player_width = 75;
var player_height = 30;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bullet_list = []
var cooldown = performance.now()

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        leftPressed = true;
    }
    if (e.key == " "){
        var timeDiff = performance.now() - cooldown;
        timeDiff /= 1000
        if (timeDiff >= 1){
            cooldown = performance.now()
            bullet_list.push([x + player_width/2, y, 5, 10])
            var audio = new Audio('Audio/shoot.wav');
            audio.volume = 0.1
            audio.play()
        }
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        leftPressed = false;
    }
}

function draw_items(){
    ctx.beginPath();
    var player = ctx.rect(x, y, player_width, player_height);
    for (let i in bullet_list){
        ctx.fillStyle = "#eee";
        if (bullet_list[i][1] > 0){
            ctx.fillRect(bullet_list[i][0], bullet_list[i][1], bullet_list[i][2], bullet_list[i][3])
            bullet_list[i][1] -= 5
        }
        else{
            bullet_list.splice(i, 1)
        }
    }
    console.log(bullet_list.length)
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(rightPressed && x < canvas.width - player_width) {
        x += dx;
    }
    else if(leftPressed && x > 0) {
        x -= dx;
    }
    draw_items()
    
}
var fps = 100
setInterval(draw, 1000/fps);