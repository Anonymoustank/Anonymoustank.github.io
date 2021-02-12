var ghost_list = []
var starting_position = 300
var starting_y_position = 100

class GameObject {
    constructor(x, y, image){
        this.x = x
        this.y = y
        this.image = new Image()
        this.image.src = image
    }
    draw(width = this.image.width, height = this.image.height){
        ctx.drawImage(this.image, this.x - width/2, this.y - height/2, width, height)
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
                    if (list[i][j] != undefined){
                        var image = new Image()
                        image.src = list[i][j]
                        list[i][j] = image
                    }
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
        ctx.drawImage(this.image_being_drawn, this.x - this.image_being_drawn.width/2, this.y - this.image_being_drawn.height/2, this.image_being_drawn.width, this.image_being_drawn.height)
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

var red_ghost = new GIF(starting_position + 500, starting_y_position + 100, [["Images/1.png", "Images/2.png"], ["Images/3.png", "Images/4.png"], ["Images/5.png", "Images/6.png"], ["Images/7.png", "Images/8.png"]], 4)
red_ghost.previous_node = null
ghost_list.push(red_ghost)

var player = new GIF(starting_position, starting_y_position, [["Images/PlayerUP - 1.png", "Images/PlayerUP - 2.png"], ["Images/PlayerRIGHT - 1.png", "Images/PlayerRIGHT - 2.png"], ["Images/PlayerLEFT - 1.png", "Images/PlayerLEFT - 2.png"], ["Images/PlayerDOWN - 1.png", "Images/PlayerDOWN - 2.png"]], 4)
var pac_man_circle = new GameObject(player.x, player.y, "Images/Circle.png")
player.lives = 3

var cyan_ghost = new GIF(starting_position + 500, starting_y_position + 100, [["Images/9.png", "Images/10.png"], ["Images/11.png", "Images/12.png"], ["Images/13.png", "Images/14.png"], ["Images/15.png", "Images/16.png"]], 4)
cyan_ghost.previous_node = null
ghost_list.push(cyan_ghost)