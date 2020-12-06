var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var dead = false;
class GameObject {
    constructor(x, y, image){
        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = image
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height)
    }
}

class GIF extends GameObject{
    constructor(x, y, list){
        super(x, y, null)
        this.image_list = list
        this.index = 0
        this.cooldown = performance.now()
    }
    draw(){
        this.image_being_drawn = this.image_list[this.index]
        ctx.drawImage(this.image_being_drawn, this.x, this.y, this.image_being_drawn.width, this.image_being_drawn.height)
        if (performance.now() - this.cooldown > 250){
            if (this.image_list.length - 1 == this.index){
                this.index = 0
            }
            else {
                this.index++
            }
            this.cooldown = performance.now()
        }   
    }
    add(image){
        this.image_list.push(image)
    }
}

var player = new GameObject(canvas.width / 2, canvas.height / 2, "Images/3.png")
player.lives = 5

var dog_walking = new GIF(canvas.width * 0.1, canvas.height / 2, [])
for (let i = 1; i < 5; i++){
    temp_image = new Image()
    temp_image.src = "Images/Dog Walking - " + i + ".png"
    dog_walking.add(temp_image)
}

function draw(){
    if (!running){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath()
        player.draw()
        dog_walking.draw()
        ctx.closePath()
    }
}

var fps = 60
setInterval(draw, 1000/fps)