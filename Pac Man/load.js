var ghost_list = []
var starting_position = 300
var starting_y_position = 100
var walls = []
var nodes = new Set()

class node {
    constructor(x, y, connecting_nodes = []){
        this.x = x
        this.y = y
        this.connecting_nodes = connecting_nodes
    }
}

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
        // j = starting_y_position + 275
        // eval('var node' + i + j + "= new node(" + i + "," + j + ")")
        // eval('nodes.add(' + "node" + i + j + ')')
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

var coins = new Set(nodes)
var large_nodes = new Set([node300250, node850500, node620370, node1200300])

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
// walls.push(new wall(starting_position - thickness, starting_y_position + 275 - thickness, 200 + width, width))
// walls.push(new wall(starting_position - thickness, starting_y_position + 275 + displacement, 200 + width, width))
walls.push(new wall(starting_position + 200 - thickness, starting_y_position + 275 - displacement, width, thickness + displacement))

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

var red_ghost = new GIF(starting_position + 500, starting_y_position + 100, [["Images/1.png", "Images/2.png"], ["Images/3.png", "Images/4.png"], ["Images/5.png", "Images/6.png"], ["Images/7.png", "Images/8.png"]], 4)
red_ghost.previous_node = null
red_ghost.scatter_node = node1200100
ghost_list.push(red_ghost)

var player = new GIF(starting_position, starting_y_position, [["Images/PlayerUP - 1.png", "Images/PlayerUP - 2.png"], ["Images/PlayerRIGHT - 1.png", "Images/PlayerRIGHT - 2.png"], ["Images/PlayerLEFT - 1.png", "Images/PlayerLEFT - 2.png"], ["Images/PlayerDOWN - 1.png", "Images/PlayerDOWN - 2.png"]], 4)
var pac_man_circle = new GameObject(player.x, player.y, "Images/Circle.png")
player.lives = 3

var cyan_ghost = new GIF(starting_position + 450, starting_y_position + 100, [["Images/9.png", "Images/10.png"], ["Images/11.png", "Images/12.png"], ["Images/13.png", "Images/14.png"], ["Images/15.png", "Images/16.png"]], 4)
cyan_ghost.previous_node = null
cyan_ghost.scatter_node = node1200650
ghost_list.push(cyan_ghost)


var orange_ghost = new GIF(starting_position + 470, starting_y_position + 100, [["Images/23.png", "Images/24.png"], ["Images/19.png", "Images/20.png"], ["Images/31.png", "Images/32.png"], ["Images/21.png", "Images/22.png"]], 4)
orange_ghost.previous_node = null
orange_ghost.scatter_node = node300650
ghost_list.push(orange_ghost)

var pink_ghost = new GIF(starting_position + 430, starting_y_position + 100, [["Images/25.png", "Images/26.png"], ["Images/29.png", "Images/30.png"], ["Images/33.png", "Images/34.png"], ["Images/27.png", "Images/28.png"]], 4)
pink_ghost.previous_node = null
pink_ghost.scatter_node = node300100
ghost_list.push(pink_ghost)

