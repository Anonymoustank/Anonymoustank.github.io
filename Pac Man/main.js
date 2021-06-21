var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var dead = false;
var keyBeingPressed = false
var hasStarted = false
var won = false
document.addEventListener("keydown", keyDownHandler, false);
var speed = 5;
var lives = 0;
var cooldown = performance.now()
var start_timer = performance.now()
var first_loop = true
var scatter_mode = false
var scatter_cooldown = new Date()
var fruit_eaten = false
var start_audio = new Audio('Audio/pacman_beginning.wav')
var waka = new Audio('Audio/waka.wav')
var eat_fruit = new Audio('Audio/fruit.wav')
var death = new Audio('Audio/death.wav')
var victory = new Audio('Audio/Victory.m4a')
victory.volume = 0.25
death.volume = 0.25
eat_fruit.volume = 0.25
waka.volume = 0.25
start_audio.volume = 0.25

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

function player_move(){
    try {
        if (keyBeingPressed == "right"){
            eval("var potential_node = node" + (player.x + speed) + player.y)
            eval("var can_move = nodes.has(node" + (player.x + speed) + player.y + ")")
            if (can_move && !forbidden_nodes.has(potential_node)){
                player.x += speed
                player.degrees = 90
            }
        }
        else if (keyBeingPressed == "left"){
            eval("var potential_node = node" + (player.x - speed) + player.y)
            eval("var can_move = nodes.has(node" + (player.x - speed) + player.y + ")")
            if (can_move && !forbidden_nodes.has(potential_node)){
                player.x -= speed
                player.degrees = 270
            }
        }
        else if (keyBeingPressed == "down"){
            eval("var potential_node = node" + player.x + (player.y + speed))
            eval("var can_move = nodes.has(node" + player.x + (player.y + speed) + ")")
            if (can_move && !forbidden_nodes.has(potential_node)){
                player.y += speed
                player.degrees = 180
            } 
        }
        else if (keyBeingPressed == "up"){
            eval("var potential_node = node" + player.x + (player.y - speed))
            eval("var can_move = nodes.has(node" + player.x + (player.y - speed) + ")")
            if (can_move && !forbidden_nodes.has(potential_node)){
                player.y -= speed
                player.degrees = 0
            }
        }
        if (can_move && !forbidden_nodes.has(potential_node)){
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

function pathfind_dfs(node, target, list, already_visited, modified_path){
    list.push(node)
    already_visited.add(node)
    let current_node = node
    while (current_node != target){
        let amt_of_nodes = 0
        let connecting_nodes = []
        if (modified_path) {
            connecting_nodes = current_node.connecting_nodes
        }
        else {
            connecting_nodes = current_node.connecting_nodes.reverse()
        }
        for (let next_node of connecting_nodes){
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

function pathfind_bfs(node, target, list, already_visited, modified_path){ 
    let current_node = node
    list.push([node])
    while (list.length > 0){
        let path = list.shift()
        current_node = path[path.length - 1]
        if (!already_visited.has(current_node)){
            if (modified_path) {
                connecting_nodes = current_node.connecting_nodes
            }
            else {
                connecting_nodes = current_node.connecting_nodes.reverse()
            }
            for (let next_node of connecting_nodes){
                if (!already_visited.has(next_node)){
                    let new_path = [...path]
                    new_path.push(next_node)
                    if (next_node == target){
                        return new_path
                    }
                    list.push(new_path)
                }
            }
            already_visited.add(current_node)
        }
    }
    return []
}

node_list = []
already_visited = new Set()

function move_ghost(ghost, target, path_algorithm){
    if (ghost.x != target.x || ghost.y != target.y){
        eval("var target_node = node" + target.x + target.y)
        eval("var ghost_node = node" + ghost.x + ghost.y)
        let shortest_path = []
        for (let node of ghost_node.connecting_nodes){ //find node that offers closest path to player
            if (node == target_node){
                ghost.x = target.x
                ghost.y = target.y
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
                if (path_algorithm == 0){
                    path = pathfind_dfs(node, target_node, node_list, already_visited, false)
                }
                else if (path_algorithm == 1){
                    path = pathfind_dfs(node, target_node, node_list, already_visited, true)
                }
                else if (path_algorithm == 2){
                    path = pathfind_bfs(node, target_node, node_list, already_visited, false)
                }
                else {
                    path = pathfind_bfs(node, target_node, node_list, already_visited, true)
                }
                if (shortest_path.length == 0 || (shortest_path.length > path.length && path.length != 0)){
                    shortest_path = path
                }
            }
        }
        
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
    
    if (scatter_mode) {
        let random_new_scatter_node = [...scatter_node_list]
        random_new_scatter_node.splice(scatter_node_list.indexOf(ghost.scatter_node), 1)
        ghost.scatter_node = random_new_scatter_node[[Math.floor(Math.random()*random_new_scatter_node.length)]]
    }
}

function orient_ghost(ghost_list){
    for (let i = 0; i < 4; i++){
        if (performance.now() - ghost_list[i].cooldown >= 0){
            if (ghost_list[i].previous_node == null || ghost_list[i].previous_node.y - ghost_list[i].y > 0){
                ghost_list[i].degrees = 0
            }
            else if (ghost_list[i].previous_node.x - ghost_list[i].x < 0){
                ghost_list[i].degrees = 90
            }
            else if (ghost_list[i].previous_node.x - ghost_list[i].x > 0){
                ghost_list[i].degrees = 270
            }
            else if (ghost_list[i].previous_node.y - ghost_list[i].y < 0){
                ghost_list[i].degrees = 180
            }
            if (!scatter_mode){
                move_ghost(ghost_list[i], player, i)
            }
            else {
                move_ghost(ghost_list[i], ghost_list[i].scatter_node, i)
            }
            if (player.x == ghost_list[i].x && player.y == ghost_list[i].y && !scatter_mode){
                waka.pause()
                waka.currentTime = 0
                death.play()
                if (lives > 0){
                    start_timer = performance.now() - 2000
                    for (let ghost of ghost_list){
                        ghost.x = ghost.original_location_x
                        ghost.y = ghost.original_location_y
                    }
                    player.x = player.original_location_x
                    player.y = player.original_location_y
                    player.degrees = 270
                    keyBeingPressed = "left"
                    hasStarted = false
                    lives -= 1
                }
                else {
                    dead = true
                }
            }
        }
        ghost_list[i].draw()
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
            for (let i = 0; i < 4; i++){
                ghost_list[i].cooldown = performance.now() + i * 3000
            }
        }
        else if (!dead && !won) {
            ctx.beginPath()
            try {
                player_move()
                waka.play()
                waka.loop = true
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

            for (let coin of coins){
                if (large_nodes.has(coin)){
                    ctx.fillStyle = "#FFFF00";
                    ctx.fillRect(coin.x - 5, coin.y - 5, 10, 10)
                }
                else {
                    ctx.fillStyle = "#eee"
                    ctx.fillRect(coin.x, coin.y, 1, 1)
                }
                
            }

            if (coins.size == 0){
                won = true
                waka.pause()
                waka.currentTime = 0
                victory.play()
            }

            eval("var player_node = node" + player.x + player.y)

            if (player_node == cherry_node && !fruit_eaten) {
                lives += 1
                eat_fruit.play()
                fruit_eaten = true
            }
            else if (!fruit_eaten) {
                cherry.draw()
            }
            
            if (coins.has(player_node)){
                coins.delete(player_node)
                if (large_nodes.has(player_node)){
                    large_nodes.delete(player_node)
                    if (scatter_mode){
                        if (scatter_cooldown - new Date() < 1500){
                            for (let i = 0; i < 4; i++){
                                main_scatter_ghost_list[i].x = second_scatter_ghost_list[i].x
                                main_scatter_ghost_list[i].y = second_scatter_ghost_list[i].y
                                main_scatter_ghost_list[i].previous_node = player_node
                                main_scatter_ghost_list[i].degrees = second_scatter_ghost_list[i].degrees
                                main_scatter_ghost_list[i].scatter_node = scatter_node_list[i]
                                main_scatter_ghost_list[i].cooldown = second_scatter_ghost_list[i].cooldown
                            }
                        }
                    }
                    else {
                        scatter_mode = true
                        for (let i = 0; i < 4; i++){
                            main_scatter_ghost_list[i].x = ghost_list[i].x
                            main_scatter_ghost_list[i].y = ghost_list[i].y
                            main_scatter_ghost_list[i].previous_node = player_node
                            main_scatter_ghost_list[i].degrees = ghost_list[i].degrees
                            main_scatter_ghost_list[i].scatter_node = scatter_node_list[i]
                            main_scatter_ghost_list[i].cooldown = ghost_list[i].cooldown
                        }
                    }
                    scatter_cooldown = new Date()
                }
            }

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

            if (scatter_mode){
                if (new Date() - scatter_cooldown >= 4000) {
                    scatter_mode = false
                    for (let i = 0; i < 4; i++){
                        ghost_list[i].x = second_scatter_ghost_list[i].x 
                        ghost_list[i].y = second_scatter_ghost_list[i].y
                        ghost_list[i].previous_node = second_scatter_ghost_list[i].previous_node
                        ghost_list[i].degrees = second_scatter_ghost_list[i].degrees
                        ghost_list[i].cooldown = second_scatter_ghost_list[i].cooldown
                    }
                }
                else {
                    ctx.textAlign = "center"
                    ctx.font = "20px Georgia";
                    let time_left = 4 - Math.round((new Date() - scatter_cooldown)/1000)
                    ctx.fillText("Scatter Mode Ends: " + time_left, canvas.width/2, starting_y_position - 50)
                    if (new Date() - scatter_cooldown < 1500){
                        orient_ghost(main_scatter_ghost_list)
                        for (let i = 0; i < 4; i++){
                            second_scatter_ghost_list[i].x = main_scatter_ghost_list[i].x
                            second_scatter_ghost_list[i].y = main_scatter_ghost_list[i].y
                            second_scatter_ghost_list[i].previous_node = main_scatter_ghost_list[i].previous_node
                            second_scatter_ghost_list[i].degrees = main_scatter_ghost_list[i].degrees
                            second_scatter_ghost_list[i].scatter_node = main_scatter_ghost_list[i].scatter_node
                            second_scatter_ghost_list[i].cooldown = main_scatter_ghost_list[i].cooldown
                        }
                    }
                    else {
                        orient_ghost(second_scatter_ghost_list)
                    }
                }
            }
            else {
                orient_ghost(ghost_list)
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
        else if (!dead && won){
            ctx.beginPath()
            ctx.fillText("Victory!", canvas.width/2, canvas.height/2)
            ctx.closePath()
        }
        else if (dead && !won) {
            ctx.beginPath()
            ctx.fillText("You died", canvas.width/2, canvas.height/2)
            ctx.closePath()
        }
    }
}

var fps = 60
setInterval(draw, 1000/fps)
