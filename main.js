var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var dx = 4;
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var player_width = 75;
var player_height = 30;
var x = canvas.width/2 - player_width/2;
var y = window.innerHeight * 0.8;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var enemy_speed = 3;
var enemy_y = 10
var loop_num = 1;
var move_down = false;

var image1 = new Image();
image1.src = "Images/Enemy1.png";

var image2 = new Image();
image2.src = "Images/Enemy2.png";

var image3 = new Image();
image3.src = "Images/Enemy3.png";

dead = false
enemy_size = 30
var original_enemy_list = [
    [
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],

    ],

    [
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],

    ],
    [
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],
        [0, 0, enemy_size, enemy_size],

    ]

]

var enemy_list = original_enemy_list

var bullet_list = []
var cooldown = performance.now() - 1000

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
    if (loop_num === 1){
        for (let row in enemy_list){
            for (let enemy in enemy_list[row]){
                enemy_list[row][enemy][0] = 10 * (enemy + 1) + (canvas.width/2 - (enemy_list[row].length * enemy_size * 1.5))
            }
        }
        loop_num = loop_num + 1
    }
    for (let row in enemy_list){
        for (let enemy in enemy_list[row]){
            if (enemy_list[row][enemy][1] >= canvas.height - enemy_size){
                dead = true
            }
            if (enemy_list[row][enemy][0] >= canvas.width - enemy_list[row][enemy][2] || enemy_list[row][enemy][0] < 0) {
                enemy_speed = enemy_speed * -1
                move_down = true
            }
            
        }
    }
    for (let row in enemy_list){
        for (let enemy in enemy_list[row]){
            if (row == 0){
                var myImage = image1
            }
            else if (row == 1){
                var myImage = image2
            }
            else if (row == 2){
                var myImage = image3
            }
            enemy_list[row][enemy][0] = enemy_list[row][enemy][0] + enemy_speed
            if (move_down){
                enemy_list[row][enemy][1] = enemy_list[row][enemy][1] + enemy_size
            }
            ctx.drawImage(myImage, enemy_list[row][enemy][0], enemy_list[row][enemy][1] + (row + 1) * 10, enemy_list[row][enemy][2], enemy_list[row][enemy][3]);
        }
    }
    move_down = false
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
var fps = 60
setInterval(draw, 1000/fps);