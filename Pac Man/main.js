var canvas = document.getElementById("myCanvas");
console.log(window.innerWidth, window.innerHeight)
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var dead = false;
var keyBeingPressed = false
var hasStarted = false
document.addEventListener("keydown", keyDownHandler, false);
var speed = 5;
var potential_move = []
var nodes = []
var starting_position = 300
for (let i = starting_position; i <= starting_position + 900; i = i + 5){
    if (i === 100){
        for (let j = 100; j <= 250; j = j + 5){
            nodes.push([i, j])
        }
    }
    else if (i === starting_position + 200){
        for (let j = 100; j <= 500; j = j + 5){
            nodes.push([i, j])
        }
    }
    else {
        nodes.push([i, 100])
    }
}

class GameObject {
    constructor(x, y, image){
        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = image
    }
    draw(width = this.image.width, height = this.image.height){
        ctx.drawImage(this.image, this.x, this.y, width, height)
    }
}

function keyDownHandler(e) {
    if (running == false){
        if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
            keyBeingPressed = "rightPressed" 
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
            keyBeingPressed = "leftPressed"
        }
        else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
            keyBeingPressed = "downPressed"
        }
        else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
            keyBeingPressed = "upPressed"
        }
    }
}


class GIF extends GameObject{
    constructor(x, y, list, amt_of_lists = 1){
        super(x, y, null)
        this.image_list = list
        if (amt_of_lists == 1){
            for (let i = 0; i < list.length; i++){
                var image = new Image()
                image.src = list[i]
                list[i] = image
            }
        }
        else {
            for (let i = 0; i < list.length; i++){
                for (let j = 0; j < list.length; j++){
                    var image = new Image()
                    image.src = list[i][j]
                    list[i][j] = image
                }
            }
        }
        this.amt_of_lists = amt_of_lists
        this.index = 0
        this.cooldown = performance.now()
        this.degrees = 0
    }
    draw(){
        if (this.amt_of_lists != 1){
            if (this.degrees == 0){
                this.image_being_drawn = this.image_list[0][this.index]
            }
            else if (this.degrees == 90){
                this.image_being_drawn = this.image_list[1][this.index]
            }
            else if (this.degrees == 270){
                this.image_being_drawn = this.image_list[2][this.index]
            }
            else if (this.degrees == 180){
                this.image_being_drawn = this.image_list[3][this.index]
            }
        }
        else {
            this.image_being_drawn = this.image_list[this.index]
        }
        ctx.drawImage(this.image_being_drawn, this.x, this.y, this.image_being_drawn.width, this.image_being_drawn.height)
        if (performance.now() - this.cooldown >= 200){
            if (this.amt_of_lists == 1){
                if (this.image_list.length - 1 == this.index){
                    this.index = 0
                }
                else {
                    this.index++
                }
                this.cooldown = performance.now()
            }
            else {
                if (this.image_list.length/this.amt_of_lists == this.index){
                    this.index = 0
                }
                else {
                    this.index++
                }
                this.cooldown = performance.now()
            }
            
        }   
        
    }
    add(image){
        this.image_list.push(image)
    }
    
}

var player = new GIF(400, 400, [["Images/PlayerUP - 1.png", "Images/PlayerUP - 2.png"], ["Images/PlayerRIGHT - 1.png", "Images/PlayerRIGHT - 2.png"], ["Images/PlayerLEFT - 1.png", "Images/PlayerLEFT - 2.png"], ["Images/PlayerDOWN - 1.png", "Images/PlayerDOWN - 2.png"]], 4)
var pac_man_circle = new GameObject(player.x - 5, player.y - 10, "Images/Circle.png")

player.lives = 3

function keyCheck(){
    if (keyBeingPressed == "rightPressed"){
        potential_move = [player.x + speed, player.y]
    }
    else if (keyBeingPressed == "leftPressed"){
        potential_move = [player.x - speed, player.y]
    }
    else if (keyBeingPressed == "downPressed"){
        potential_move = [player.x, player.y + speed]
    }
    else if (keyBeingPressed == "upPressed"){
        potential_move = [player.x, player.y - speed]
    }
}

function draw(){
    if (!running){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        keyCheck()
        player.draw()
        if (!hasStarted){
            pac_man_circle.draw()
        }
        for (let node of nodes){
            if (node[0] === potential_move[0] && node[1] === potential_move[1]){
                hasStarted = true
                if (keyBeingPressed == "rightPressed"){
                    player.x += speed
                    player.degrees = 90
                }
                else if (keyBeingPressed == "leftPressed"){
                    player.x -= speed
                    player.degrees = 270
                }
                else if (keyBeingPressed == "downPressed"){
                    player.y += speed
                    player.degrees = 180
                }
                else if (keyBeingPressed == "upPressed"){
                    player.y -= speed
                    player.degrees = 0
                }
            }
            ctx.fillRect(node[0], node[1], 1, 1)
        }
        ctx.fill()
        ctx.closePath()
    }
}

var fps = 60
setInterval(draw, 1000/fps)