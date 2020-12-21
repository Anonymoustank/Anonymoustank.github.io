var canvas = document.getElementById("myCanvas");
console.log(window.innerWidth, window.innerHeight)
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var dead = false;
var keyBeingPressed = false
document.addEventListener("keydown", keyDownHandler, false);
var speed = 4;
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
            player.degrees = 90
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
            keyBeingPressed = "leftPressed"
            player.degrees = 270
        }
        else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
            keyBeingPressed = "downPressed"
            player.degrees = 180
        }
        else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
            keyBeingPressed = "upPressed"
            player.degrees = 0
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

var player = new GIF(canvas.width / 2, canvas.height / 2, [["Images/PlayerUP - 1.png", "Images/PlayerUP - 2.png"], ["Images/PlayerRIGHT - 1.png", "Images/PlayerRIGHT - 2.png"], ["Images/PlayerLEFT - 1.png", "Images/PlayerLEFT - 2.png"], ["Images/PlayerDOWN - 1.png", "Images/PlayerDOWN - 2.png"]], 4)

player.lives = 3

function draw(){
    if (!running){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        if (keyBeingPressed == "rightPressed"){
            player.x += speed
        }
        else if (keyBeingPressed == "leftPressed"){
            player.x -= speed
        }
        else if (keyBeingPressed == "downPressed"){
            player.y += speed
        }
        else if (keyBeingPressed == "upPressed"){
            player.y -= speed
        }
        player.draw()
        ctx.closePath()
    }
}

var fps = 60
setInterval(draw, 1000/fps)