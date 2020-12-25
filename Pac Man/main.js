var canvas = document.getElementById("myCanvas");
console.log(window.innerWidth, window.innerHeight)
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var dead = false;
var keyBeingPressed = false
var hasStarted = false
var previous_key = false
document.addEventListener("keydown", keyDownHandler, false);
var speed = 5;
var potential_move = []
var nodes = new Set()
var starting_position = 300
var starting_y_position = 100

class node {
    constructor(x, y, connecting_nodes = []){
        this.x = x
        this.y = y
        this.connecting_nodes = connecting_nodes
    }
}
for (let i = starting_position; i <= starting_position + 900; i = i + 5){
    if (i === starting_position + 200){
        for (let j = starting_y_position; j <= starting_y_position + 400; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
            // nodes.push(new node(i, j))
        }
    }
    else {
        // nodes.push(new node(i, starting_y_position))
        eval('var node' + i + starting_y_position + "= new node(" + i + "," + starting_y_position + ")")
        eval('nodes.add(' + "node" + i + starting_y_position + ')')
    }
    // nodes.push(new node(i, starting_y_position + 550))
    eval('var node' + i + (starting_y_position + 550) + "= new node(" + i + "," + (starting_y_position + 550) + ")")
    eval('nodes.add(' + "node" + i + (starting_y_position + 550) + ')')
}

for (let node of nodes){
    try {
        eval('var test_node1 = node' + (node.x + 5) + node.y)
        if (nodes.has(test_node1)){
            node.connecting_nodes.push(test_node1)
        }
    }
    catch (e){}
    try{
        eval('var test_node2 = node' + (node.x - 5) + node.y)
        if (nodes.has(test_node2)){
            node.connecting_nodes.push(test_node2)
        }
    }
    catch (e){}
    try {
        eval('test_node3 = node' + node.x + (node.y + 5))
        if (nodes.has(test_node3)){
            node.connecting_nodes.push(test_node3)
        }
    }
    catch (e){}
    try{
        eval('test_node4 = node' + node.x + (node.y - 5))
        if (nodes.has(test_node4)){
            node.connecting_nodes.push(test_node4)
        }
    }
    catch (e){}
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
        if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d"){
            previous_key = keyBeingPressed
            keyBeingPressed = "rightPressed" 
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a"){
            previous_key = keyBeingPressed
            keyBeingPressed = "leftPressed"
        }
        else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
            previous_key = keyBeingPressed
            keyBeingPressed = "downPressed"
        }
        else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
            previous_key = keyBeingPressed
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

var player = new GIF(starting_position, starting_y_position, [["Images/PlayerUP - 1.png", "Images/PlayerUP - 2.png"], ["Images/PlayerRIGHT - 1.png", "Images/PlayerRIGHT - 2.png"], ["Images/PlayerLEFT - 1.png", "Images/PlayerLEFT - 2.png"], ["Images/PlayerDOWN - 1.png", "Images/PlayerDOWN - 2.png"]], 4)
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

function player_move(){
    if (keyBeingPressed == "rightPressed"){
        eval("var can_move = nodes.has(node" + (player.x + speed) + player.y + ")")
        if (can_move){
            player.x += speed
            player.degrees = 90
        }
    }
    else if (keyBeingPressed == "leftPressed"){
        eval("var can_move = nodes.has(node" + (player.x - speed) + player.y + ")")
        if (can_move){
            player.x -= speed
            player.degrees = 270
        }
    }
    else if (keyBeingPressed == "downPressed"){
        eval("var can_move = nodes.has(node" + player.x + (player.y + speed) + ")")
        if (can_move){
            player.y += speed
            player.degrees = 180
        } 
    }
    else if (keyBeingPressed == "upPressed"){
        eval("var can_move = nodes.has(node" + player.x + (player.y - speed) + ")")
        if (can_move){
            player.y -= speed
            player.degrees = 0
        }
    }
    if (can_move){
        hasStarted = true
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
        try {
            player_move()
            previous_key = keyBeingPressed
        }
        catch (error){
            try {
                keyBeingPressed = previous_key
                player_move()
            }  
            catch (error){
            }
        }
        for (let node of nodes){
            ctx.fillRect(node.x, node.y, 1, 1)
        }
        ctx.fill()
        ctx.closePath()
    }
}

var fps = 60
setInterval(draw, 1000/fps)