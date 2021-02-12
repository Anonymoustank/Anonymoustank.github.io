var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var dead = false;
var keyBeingPressed = false
var hasStarted = false
document.addEventListener("keydown", keyDownHandler, false);
var speed = 5;
var nodes = new Set()
var walls = []
var cooldown = performance.now()
var start_timer = performance.now()
var first_loop = true
var start_audio = new Audio('Audio/pacman_beginning.wav')
start_audio.volume = 0.25

class wall {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
class node {
    constructor(x, y, connecting_nodes = []){
        this.x = x
        this.y = y
        this.connecting_nodes = connecting_nodes
    }
}
for (let i = starting_position; i <= starting_position + 900; i = i + 5){ //map generation
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
    else if (i == starting_position + 285){
        for (let j = starting_y_position + 180; j <= starting_y_position + 270; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    if (i <= starting_position + 323 && i >= starting_position + 285){
        let j = starting_y_position + 270
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i <= starting_position + 375 && i >= starting_position + 285){
        let j = starting_y_position + 180
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i < starting_position + 550){
        let j = starting_y_position + 400
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    else if (i == starting_position + 550){
        for (let j = starting_y_position + 400; j <= starting_y_position + 475; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    if (i >= starting_position + 250 && i < starting_position + 725){
        let j = starting_y_position + 475
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    else if (i == starting_position + 725){
        for (let j = starting_y_position + 475; j >= starting_y_position; j = j - 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    if (i >= starting_position + 375 && i < starting_position + 565){
        let j = starting_y_position + 100
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    else if (i == starting_position + 565){
        for (let j = starting_y_position + 100; j <= starting_y_position + 200; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }
    else if (i > starting_position + 565 && i < starting_position + 900){
        let j = starting_y_position + 200
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i <= starting_position + 200){
        let j = starting_y_position + 150
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
        j = starting_y_position + 275
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i >= starting_position + 375){
        let j = starting_y_position + 325
        eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        eval('nodes.add(' + "node" + i + j + ')')
    }
    if (i == starting_position + 900){
        for (let j = starting_y_position; j <= starting_y_position + 550; j = j + 5){
            eval('var node' + i + j + "= new node(" + i + "," + j + ")")
            eval('nodes.add(' + "node" + i + j + ')')
        }
    }

    // nodes.push(new node(i, starting_y_position))
    eval('var node' + i + starting_y_position + "= new node(" + i + "," + starting_y_position + ")")
    eval('nodes.add(' + "node" + i + starting_y_position + ')')
    // nodes.push(new node(i, starting_y_position + 550))
    eval('var node' + i + (starting_y_position + 550) + "= new node(" + i + "," + (starting_y_position + 550) + ")")
    eval('nodes.add(' + "node" + i + (starting_y_position + 550) + ')')
}
var width = 10
var displacement = 22.5
var thickness = displacement + width
walls.push(new wall(starting_position - thickness, starting_y_position - thickness, 900 + thickness * 2, width)) //outer walls
walls.push(new wall(starting_position + 900 + displacement, starting_y_position - thickness, width, 550 + thickness * 2))
walls.push(new wall(starting_position - displacement, starting_y_position + 550 + displacement, 900 + displacement * 2, width))

walls.push(new wall(starting_position + displacement, starting_y_position + displacement, width, 150 - displacement * 2)) //upper left
walls.push(new wall(starting_position - thickness, starting_y_position - thickness, width, 150 + displacement * 2 + width))
walls.push(new wall(starting_position - thickness, starting_y_position + 150 + displacement, 200 + width, width))
walls.push(new wall(starting_position + displacement, starting_y_position + 150 - thickness, 200 - displacement * 2, width))
walls.push(new wall(starting_position + displacement, starting_y_position + displacement, 200 - displacement * 2, width))
walls.push(new wall(starting_position + 200 - thickness, starting_y_position + displacement, width, 150 - displacement * 2))

walls.push(new wall(starting_position - thickness, starting_y_position + 400 - displacement, width, 150 + displacement * 2 + width)) //bottom left
walls.push(new wall(starting_position + 250 - thickness, starting_y_position + 400 + displacement, width, 150 - displacement * 2))
walls.push(new wall(starting_position - thickness, starting_y_position + 400 - thickness, 200 + width, width))
walls.push(new wall(starting_position + displacement, starting_y_position + 400 + displacement, width, 150 - displacement * 2))
walls.push(new wall(starting_position + displacement, starting_y_position + 400 + displacement, 250 - displacement * 2, width))
walls.push(new wall(starting_position + displacement, starting_y_position + 550 - thickness, 250 - displacement * 2, width))

walls.push(new wall(starting_position + 200 + displacement, starting_y_position + displacement, width, 300 + displacement * 2 + width)) //middle left
walls.push(new wall(starting_position + 200 - thickness, starting_y_position + 275 + displacement, width, 125 - displacement * 2))
walls.push(new wall(starting_position + 200 - thickness, starting_y_position + 150 + displacement, width, 125 - displacement * 2))
walls.push(new wall(starting_position - thickness, starting_y_position + 275 - thickness, 200 + width, width))
walls.push(new wall(starting_position - thickness, starting_y_position + 275 + displacement, 200 + width, width))
walls.push(new wall(starting_position - thickness, starting_y_position + 275 - displacement, width, thickness + displacement))

walls.push(new wall(starting_position + 200 + thickness, starting_y_position + displacement, 175 - thickness * 2, width)) //middle
walls.push(new wall(starting_position + 200 + thickness, starting_y_position + 400 - thickness, 175 - thickness * 2, width))
walls.push(new wall(starting_position + 375 - thickness, starting_y_position + displacement, width, 180 - displacement * 2))
walls.push(new wall(starting_position + 375 - thickness, starting_y_position + 180 + displacement, width, 220 - displacement * 2))
walls.push(new wall(starting_position + 285 - displacement, starting_y_position + 180 - thickness, 90, width))
walls.push(new wall(starting_position + 285 - thickness, starting_y_position + 180 - thickness, width, 145))
walls.push(new wall(starting_position + 285 - thickness, starting_y_position + 325 - thickness, 90, width))
walls.push(new wall(starting_position + 285 + displacement, starting_y_position + 180 + displacement, 90 - displacement * 2, width))
walls.push(new wall(starting_position + 285 + displacement, starting_y_position + 183 + displacement * 2 + width, 90 - displacement * 2, width))
walls.push(new wall(starting_position + 285 + displacement, starting_y_position + 180 + displacement + width, width, displacement + 3))

walls.push(new wall(starting_position + 375 + displacement, starting_y_position + displacement, 335 - thickness, width))//middle top
walls.push(new wall(starting_position + 375 + displacement, starting_y_position + displacement, width, 100 - displacement * 2)) 
walls.push(new wall(starting_position + 715 - displacement, starting_y_position + displacement, width, 200 - displacement * 2))
walls.push(new wall(starting_position + 375 + displacement, starting_y_position + 100 - thickness, 190, width)) 
walls.push(new wall(starting_position + 565 + displacement, starting_y_position + 100 - thickness, width, 100 + width))
walls.push(new wall(starting_position + 565 + displacement, starting_y_position + 100 - thickness, width, 100 + width))
walls.push(new wall(starting_position + 565 + displacement, starting_y_position + 200 - thickness, 100 + width, width))

walls.push(new wall(starting_position + 715 + thickness, starting_y_position + displacement, width, 200 - displacement * 2)) //top right
walls.push(new wall(starting_position + 900 - thickness, starting_y_position + displacement, width, 200 - displacement * 2))
walls.push(new wall(starting_position + 715 + thickness, starting_y_position + displacement, 125, width))
walls.push(new wall(starting_position + 715 + thickness, starting_y_position + 200 - thickness, 125, width))

walls.push(new wall(starting_position + 715 + thickness, starting_y_position + 200 + displacement, width, 125 - displacement * 2)) //middle right
walls.push(new wall(starting_position + 900 - thickness, starting_y_position + 200 + displacement, width, 125 - displacement * 2))
walls.push(new wall(starting_position + 715 + thickness, starting_y_position + 200 + displacement, 125, width))
walls.push(new wall(starting_position + 715 + thickness, starting_y_position + 325 - thickness, 125, width))

walls.push(new wall(starting_position + 250 + displacement, starting_y_position + 475 + displacement, width, 15 + width))//bottom right
walls.push(new wall(starting_position + 715 + thickness, starting_y_position + 325 + displacement, 125, width)) 
walls.push(new wall(starting_position + 715 + thickness, starting_y_position + 325 + displacement, width, 150 + width))
walls.push(new wall(starting_position + 900 - thickness, starting_y_position + 325 + displacement, width, 225 - displacement * 2))
walls.push(new wall(starting_position + 250 + displacement, starting_y_position + 550 - thickness, 650 - displacement * 2, width))
walls.push(new wall(starting_position + 250 + displacement, starting_y_position + 475 + displacement, 475 + width, width))

walls.push(new wall(starting_position + 250 + displacement, starting_y_position + 400 + displacement, width, 75 - displacement * 2)) //middle bottom
walls.push(new wall(starting_position + 250 + displacement, starting_y_position + 400 + displacement, 300 - displacement * 2, width))
walls.push(new wall(starting_position + 550 - thickness, starting_y_position + 400 + displacement, width, 75 - displacement * 2))
walls.push(new wall(starting_position + 250 + displacement, starting_y_position + 475 - thickness, 300 - displacement * 2, width))

walls.push(new wall(starting_position + 715 - displacement, starting_y_position + 325 + displacement, width, 150 - displacement * 2)) //more middle bottom
walls.push(new wall(starting_position + 375 + displacement, starting_y_position + 325 + displacement, 335 - thickness, width)) 
walls.push(new wall(starting_position + 550 + displacement, starting_y_position + 475 - thickness, 175 - displacement * 2, width))
walls.push(new wall(starting_position + 550 + displacement, starting_y_position + 400 - displacement, width, 75 - width))
walls.push(new wall(starting_position + 375 + displacement, starting_y_position + 400 - thickness, 175 + width, width)) 
walls.push(new wall(starting_position + 375 + displacement, starting_y_position + 325 + displacement, width, displacement)) 

var ghost_wall = new wall(starting_position + 375 + displacement, starting_y_position + 100 + displacement, 190 - displacement * 2, width) //Red wall
walls.push(ghost_wall)

walls.push(new wall(starting_position + 375 + displacement, starting_y_position + 100 + displacement, width, 225 - displacement * 2)) //Ghost Cage
walls.push(new wall(starting_position + 375 + displacement, starting_y_position + 325 - thickness, 350 - displacement * 2, width))
walls.push(new wall(starting_position + 725 - thickness, starting_y_position + 200 + displacement, width, 125 - displacement * 2))
walls.push(new wall(starting_position + 565 - thickness, starting_y_position + 200 + displacement, 160 + width, width))
walls.push(new wall(starting_position + 565 - thickness, starting_y_position + 100 + displacement, width, 100))

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

function has_collided(object1 = player, object2 = red_ghost){
    let x1 = object1.x
    let y1 = object1.y
    let width1 = 42
    let height1 = 45

    let x2 = object2.x
    let y2 = object2.y
    let width2 = 38
    let height2 = 38

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

function pathfind_dfs(node, target, list, already_visited){
    list.push(node)
    already_visited.add(node)
    let current_node = node
    while (current_node != target){
        let amt_of_nodes = 0
        for (let next_node of current_node.connecting_nodes){
            if (next_node == target){
                list.push(next_node)
                return [...list]
            }
            else if (!already_visited.has(next_node)){
                current_node = next_node
                list.push(next_node)
                already_visited.add(next_node)
                amt_of_nodes += 1
                break
            }
        }
        if (amt_of_nodes == 0 && current_node == node){
            return []
        }
        if (amt_of_nodes == 0){
            if (current_node != node){
                list.splice(list.indexOf(current_node), 1)
                current_node = list[list.length - 1]
            }
        }
    }
}

function pathfind_bfs(node, target, list, already_visited){
    let current_node = node
    list.push([node])
    while (list.length > 0){
        let path = list.shift()
        current_node = path[path.length - 1]
        if (!already_visited.has(current_node)){
            already_visited.add(current_node)
            for (let next_node of current_node.connecting_nodes){
                if (!already_visited.has(next_node)){
                    let new_path = path
                    new_path.push(next_node)
                    list.push(new_path)
                    if (next_node == target){
                        return new_path
                    }
                }
            }
        }
    }
    return []
}

node_list = []
already_visited = new Set()

function move_ghost(ghost){
    if (ghost.x != player.x || ghost.y != player.y){
        eval("var ghost_node = node" + ghost.x + ghost.y)
        eval("var player_node = node" + player.x + player.y)
        let shortest_path = []
        for (let node of ghost_node.connecting_nodes){ //find node that offers closest path to player
            if (node == player_node){
                ghost.x = player.x
                ghost.y = player.y
                break
            }
            else if (node != ghost.previous_node){
                node_list.splice(0, node_list.length)
                already_visited.clear()
                if (ghost.previous_node != null){
                    already_visited.add(ghost.previous_node)//can't double back to go to ghost's previous position
                }
                already_visited.add(ghost_node) //can't double back to go to ghost's current position
                let path = []
                if (ghost == red_ghost){
                    path = pathfind_dfs(node, player_node, node_list, already_visited)
                }
                else if (ghost == cyan_ghost){
                    path = pathfind_bfs(node, player_node, node_list, already_visited)
                }
                if (shortest_path.length == 0 || (shortest_path.length > path.length && path.length != 0)){
                    shortest_path = path
                }
            }
        }
        if (shortest_path.length == 0){
            ghost.previous_node = null
            move_ghost(ghost)
        }
        else {
            for (let node of shortest_path){
                if (node != ghost.previous_node && node != ghost_node){
                    ghost.x = node.x
                    ghost.y = node.y
                    break
                }
            }
            if (ghost.previous_node != ghost_node){
                ghost.previous_node = ghost_node 
            }
        }
    }

}

function draw(){
    if (!running){
        ctx.fillStyle = "#eee"
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
            // for (let node of nodes){
            //     ctx.fillRect(node.x, node.y, 1, 1)
            // }
            ctx.fillStyle = "#0000FF"
            for (let wall of walls){
                if (wall != ghost_wall){
                    wall.draw()
                }
                else {
                    ctx.fillStyle = "#FF0000"
                    wall.draw()
                    ctx.fillStyle = "#0000FF"
                }
            }
            for (let ghost of ghost_list){
                if (ghost.previous_node == null || ghost.previous_node.y - ghost.y > 0){
                    ghost.degrees = 0
                }
                else if (ghost.previous_node.x - ghost.x < 0){
                    ghost.degrees = 90
                }
                else if (ghost.previous_node.x - ghost.x > 0){
                    ghost.degrees = 270
                }
                else if (ghost.previous_node.y - ghost.y < 0){
                    ghost.degrees = 180
                }
                ghost.draw()
                move_ghost(ghost)
                if (has_collided(player, ghost)){
                    console.log("Game Over")
                }
            }
            
            if (!hasStarted){
                pac_man_circle.draw()
            }
            else {
                player.draw()
            }
            ctx.fill()
            ctx.closePath()
        }
    }
}

var fps = 60
setInterval(draw, 1000/fps)
