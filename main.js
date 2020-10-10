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
var wave = 1
var enemy_speed = -2;
var loop_num = 1;
var move_down = false;
var score = 0;
var lives = 2;
var ufo_present = false

var ufoImage = new Image()
ufoImage.src = "Images/UFO.png"

var playerImage = new Image();
playerImage.src = "Images/Player.ico"

var audio = new Audio('Audio/shoot.wav');
audio.volume = 0.1

var enemy_killed = new Audio('Audio/invaderkilled.wav');
enemy_killed.volume = 0.1

var explosion = new Audio('Audio/explosion.wav')
explosion.volume = 0.1

var image1 = new Image();
image1.src = "Images/Enemy1.png";

var image2 = new Image();
image2.src = "Images/Enemy2.png";

var image3 = new Image();
image3.src = "Images/Enemy4.png";

dead = false
enemy_size = 30
var enemy_list = [
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

var bullet_list = []
var enemy_bullet_list = []
var cooldown = performance.now() - 1000

var time_since_move_down = performance.now()


function has_collided(list1, list2, row){
    let x1 = list1[0]
    let y1 = list1[1]
    let width1 = list1[2]
    let height1 = list1[3]

    let x2 = list2[0]
    let y2 = list2[1] + (row + 1) * 10
    let width2 = list2[2]
    let height2 = list2[3]

    if(x1 < x2 + width2 &&
        x1 + width1 > x2 &&
        y1 < y2 + height2 &&
        y1 + height1 > y2)
    {
        return true
    }
    else {
        return false
    }
    
}

function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}  

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
    var random_num = randomNumber(1, 500)
    if (random_num == 3 && ufo_present == false){
        ufo_present = true
        ufo_x = 0
    }
    if (ufo_present){
        ctx.drawImage(ufoImage, ufo_x, canvas.height * 0.01, player_width, player_height)
        ufo_x = ufo_x + 2
        if (ufo_x > canvas.width){
            ufo_present = false
        }
        for (let bullet in bullet_list){
            if(has_collided(bullet_list[bullet], [ufo_x, canvas.height * 0.01, player_width, player_height], -1)){
                enemy_killed.play()
                ufo_present = false
                score = score + 100
            }
        }
    }
    for (let i = 0; i < lives; i++){
        ctx.drawImage(playerImage, player_width * i, canvas.height * 0.95, player_width, player_height);
    }
    ctx.font = "30px Georgia";
    ctx.fillText("Wave: " + wave.toString(), canvas.width * 0.9, canvas.height * 0.95);
    ctx.fillText("Score: " + score.toString(), canvas.width/2 - 75, canvas.height * 0.95)
    if (enemy_list[0].length == 0 && enemy_list[1].length == 0 && enemy_list[2].length == 0){
        ufo_present = false
        enemy_list = [[[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],], [[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],], [[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],[0, 0, enemy_size, enemy_size],]]
        loop_num = 1
        if (Math.abs(enemy_speed) < 15){
            enemy_speed = Math.abs(enemy_speed)
            enemy_speed = enemy_speed + 1
        }
        wave = wave + 1
    }
    if (loop_num === 1){
        for (let row in enemy_list){
            for (let enemy in enemy_list[row]){
                enemy_list[row][enemy][0] = 10 * (enemy + 1) + (canvas.width/2 - (enemy_list[row].length * enemy_size * 1.5))
                enemy_list[row][enemy][1] = enemy_list[row][enemy][1] + enemy_size * 2
            }
        }
        loop_num = loop_num + 1
    }
    for (let row in enemy_list){
        for (let enemy in enemy_list[row]){
            for (let bullet in bullet_list){
                if (has_collided(bullet_list[bullet], enemy_list[row][enemy], row)){
                    bullet_list.splice(bullet, 1)
                    enemy_list[row].splice(enemy, 1)
                    enemy_killed.play()
                    score = score + 10
                }
            }
        }
    }
    for (let row in enemy_list){
        for (let enemy in enemy_list[row]){
            if (enemy_list[row][enemy][1] >= y - enemy_size * 7){
                dead = true
            }
            if (enemy_list[row][enemy][0] >= canvas.width - enemy_list[row][enemy][2] || enemy_list[row][enemy][0] < 0 + enemy_list[row][enemy][2]/2) {
                if (enemy_list[row][enemy][0] >= canvas.width - enemy_list[row][enemy][2]){
                    var case1 = true
                    var case2 = false
                }
                else {
                    var case2 = true
                    var case1 = false
                }
                enemy_speed = enemy_speed * -1
                move_down = true
                for (let row1 in enemy_list){
                    for (let enemy1 in enemy_list[row1]){
                        if (case1){
                            enemy_list[row1][enemy1][0] = enemy_list[row1][enemy1][0] - enemy_list[row1][enemy1][2] - 2
                        }
                        else if (case2){
                            enemy_list[row1][enemy1][0] = enemy_list[row1][enemy1][0] + enemy_list[row1][enemy1][2] + 2
                        }
                    }
                }   
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
            if (randomNumber(1, 850) == 5){
                enemy_bullet_list.push([enemy_list[row][enemy][0] + enemy_list[row][enemy][2]/2, enemy_list[row][enemy][1] + (row + 1) * 10, 5, 10])
            }
        }
    }
    if (move_down){
        time_since_move_down = performance.now()
    }
    move_down = false
    var player = ctx.drawImage(playerImage, x, y, player_width, player_height);
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
    for (let i in enemy_bullet_list){
        ctx.fillStyle = "#FF0000";
        if (enemy_bullet_list[i][1] < canvas.height){
            if (has_collided(enemy_bullet_list[i], [x, y, player_width, player_height], -1)){
                explosion.play()
                enemy_bullet_list.splice(i, 1)
                lives -= 1
                x = canvas.width/2 - player_width/2
                if (lives <= 0){
                    dead = true
                }
            }
            else {
                ctx.fillRect(enemy_bullet_list[i][0], enemy_bullet_list[i][1], enemy_bullet_list[i][2], enemy_bullet_list[i][3])
                enemy_bullet_list[i][1] += 5
            }
        }
        else{
            enemy_bullet_list.splice(i, 1)
        }
    }
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    if (running == false){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (dead == false){
            if(rightPressed && x < canvas.width - player_width) {
                x += dx;
            }
            else if(leftPressed && x > 0) {
                x -= dx;
            }
            draw_items()
        }
        else {
            ctx.beginPath();
            ctx.font = "80px Georgia";
            ctx.fillText("You Lose", canvas.width/2 - 150, canvas.height * 0.2)
            ctx.font = "30px Georgia";
            ctx.fillText("Wave: " + wave.toString(), canvas.width/2 - 75, canvas.height/2);
            ctx.fillText("Final Score: " + score.toString(), canvas.width/2 - 75, canvas.height/2 - canvas.height/8)
            ctx.fillStyle = "#eee";
            ctx.fill();
            ctx.closePath();
        }
    }
}
var fps = 60
setInterval(draw, 1000/fps);