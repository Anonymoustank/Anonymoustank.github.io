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
var junction_list = []
var nodes = new Set()
var starting_position = 300
var starting_y_position = 100
var cooldown = performance.now()
var start_timer = performance.now()
var first_loop = true
var start_audio = new Audio('Audio/pacman_beginning.wav')
start_audio.volume = 0.25

class node {
    constructor(x, y, connecting_nodes = []){
        this.x = x
        this.y = y
        this.connecting_nodes = connecting_nodes
    }
}
for (let i = starting_position; i <= starting_position + 900; i = i + 5){
    if (i == starting_position + 200){
        for (let j = starting_y_position; j <= starting_y_position + 400; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
            // nodes.push(new node(i, j))
        }
    }
    else if (i == starting_position + 250){
        for (let j = starting_y_position + 550; j >= starting_y_position + 400; j = j - 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    else if (i == starting_position){
        for (let j = starting_y_position; j <= starting_y_position + 150; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
        for (let j = starting_y_position + 550; j >= starting_y_position + 400; j = j - 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    else if (i == starting_position + 375){
        for (let j = starting_y_position; j <= starting_y_position + 400; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    else if (i == starting_position + 235){
        for (let j = starting_y_position + 180; j <= starting_y_position + 270; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    if (i <= starting_position + 300 && i >= starting_position + 235){
        let j = starting_y_position + 270
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i <= starting_position + 375 && i >= starting_position + 235){
        let j = starting_y_position + 180
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i <= starting_position + 550){
        let j = starting_y_position + 400
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i <= starting_position + 200){
        let j = starting_y_position + 150
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }

    // nodes.push(new node(i, starting_y_position))
    eval('var node' + i + starting_y_position + "= new node(" + i + "," + starting_y_position + ")")
    eval('nodes.add(' + "node" + i + starting_y_position + ')')
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
        eval('var test_node3 = node' + node.x + (node.y + 5))
        if (nodes.has(test_node3)){
            node.connecting_nodes.push(test_node3)
        }
    }
    catch (e){}
    try{
        eval('var test_node4 = node' + node.x + (node.y - 5))
        if (nodes.has(test_node4)){
            node.connecting_nodes.push(test_node4)
        }
    }
    catch (e){}
    if (node.connecting_nodes.length > 2){
        junction_list.push(node)
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
        if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d"){
            keyBeingPressed = "right" 
            cooldown = performance.now()
        }
        else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a"){
            keyBeingPressed = "left"
            cooldown = performance.now()
        }
        else if (e.key == "Down" || e.key == "ArrowDown" || e.key == "s"){
            keyBeingPressed = "down"
            cooldown = performance.now()
        }
        else if (e.key == "Up" || e.key == "ArrowUp" || e.key == "w"){
            keyBeingPressed = "up"
            cooldown = performance.now()
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

function player_move(){
    try {
        if (keyBeingPressed == "right"){
            eval("var can_move = nodes.has(node" + (player.x + speed) + player.y + ")")
            if (can_move){
                player.x += speed
                player.degrees = 90
            }
        }
        else if (keyBeingPressed == "left"){
            eval("var can_move = nodes.has(node" + (player.x - speed) + player.y + ")")
            if (can_move){
                player.x -= speed
                player.degrees = 270
            }
        }
        else if (keyBeingPressed == "down"){
            eval("var can_move = nodes.has(node" + player.x + (player.y + speed) + ")")
            if (can_move){
                player.y += speed
                player.degrees = 180
            } 
        }
        else if (keyBeingPressed == "up"){
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
    catch (error) {
        if (player.degrees == 90){
            eval("var can_move = nodes.has(node" + (player.x + speed) + player.y + ")")
            if (can_move){
                player.x += speed
                player.degrees = 90
            }
        }
        else if (player.degrees == 270){
            eval("var can_move = nodes.has(node" + (player.x - speed) + player.y + ")")
            if (can_move){
                player.x -= speed
                player.degrees = 270
            }
        }
        else if (player.degrees == 180){
            eval("var can_move = nodes.has(node" + player.x + (player.y + speed) + ")")
            if (can_move){
                player.y += speed
                player.degrees = 180
            } 
        }
        else if (player.degrees == 0){
            eval("var can_move = nodes.has(node" + player.x + (player.y - speed) + ")")
            if (can_move){
                player.y -= speed
                player.degrees = 0
            }
        }
    }
    
}


function pathfind(node, target, list, already_visited){
    already_visited.clear()
    list.splice(0, list.length)
    list.push(node)
    already_visited.add(node)
    var current_node = node
    while (current_node != target){
        let amt_of_nodes = 0
        for(let next_node of current_node.connecting_nodes){
            if (next_node == target){
                list.push(next_node)
                return;
            }
            else if (!already_visited.has(next_node)){
                current_node = next_node
                list.push(next_node)
                already_visited.add(next_node)
                amt_of_nodes += 1
                break
            }
        }
        if (amt_of_nodes == 0){
            if (current_node != node){
                list.splice(list.indexOf(current_node), 1)
                current_node = list[list.length - 1]
            }
        }
    }
}

test_list = []
already_visited = new Set()
pathfind(node705650, node600370, test_list, already_visited)

function draw(){
    if (!running){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (first_loop){
            start_timer = performance.now()
            first_loop = false
            start_audio.play()
        }
        ctx.textAlign = "center"
        ctx.font = "60px Georgia";
        if (performance.now() - start_timer <= Math.floor((start_audio.duration * 1000)) - 3000){
            ctx.fillText("Ready!", canvas.width/2, canvas.height/2)
        }
        else if (performance.now() - start_timer <= Math.floor((start_audio.duration * 1000)) - 2000){
            ctx.fillText("3", canvas.width/2, canvas.height/2)
        }
        else if (performance.now() - start_timer <= Math.floor((start_audio.duration * 1000)) - 1000){
            ctx.fillText("2", canvas.width/2, canvas.height/2)
        }
        else if (performance.now() - start_timer <= Math.floor((start_audio.duration * 1000))){
            ctx.fillText("1", canvas.width/2, canvas.height/2)
        }
        else {
            ctx.beginPath()
            player.draw()
            if (!hasStarted){
                pac_man_circle.draw()
            }
            try {
                player_move()
            }
            catch (error){}
            if (performance.now() - cooldown > 250){
                if (player.degrees == 90){
                    keyBeingPressed = "right"
                }
                else if (player.degrees == 270){
                keyBeingPressed = "left"
                }
                else if (player.degrees == 180){
                    keyBeingPressed = "down"
                }
                else if (player.degrees == 0){
                    keyBeingPressed = "up"
                }
            }
            for (let node of nodes){
                ctx.fillRect(node.x, node.y, 1, 1)
            }
            ctx.fill()
            ctx.closePath()
        }
    }
}

var fps = 60
setInterval(draw, 1000/fps)