const canvas = document.getElementById("gamescreen");
const canv = canvas.getContext("2d");
const scoredisplay = document.getElementById("score")
const taildisplay = document.getElementById("tail")

class snake{
    constructor(x, y){
        this.x = x;
        this.y = y;

    }
}


let speed = 5;
let tileamount = 20;
let tilesize = 18;


const snakeparts = [];
let taillength = 2;

let headx = 10;
let heady = 10;
let applex = 5;
let appley = 6;

let score = 0;

let xvel = 0;
let yvel = 0


document.body.addEventListener("keydown", (event) => {
    switch(event.keyCode){
        case 38:
            if(yvel !== 1){
                yvel = -1;
                xvel = 0;
            }else{
                return
            }
            break;
        case 40:
            if(yvel !== -1){
                yvel = 1;
                xvel = 0;
            }else{
                return
            }
            break;
        case 37:
            if(xvel !== 1){
                yvel = 0;
                xvel = -1;
            }else{
                return
            }
            break;
        case 39:
            if(xvel !== -1){
                yvel = 0;
                xvel = 1;
            }else{
                return
            }
            break;
    }

});

let functions = {
    updategame: function update(){
        functions.changesnakepos()
        let result = functions.checkgameover()
        if (result){
            return;
        }

        functions.clearscreen()
        functions.checkcollison()

        functions.drawapple()
        functions.drawsnake()
        setTimeout(update, 1000/speed)

        scoredisplay.innerHTML = score
        taildisplay.innerHTML = taillength
    },
    checkcollison: function checkcollison(){
        if(applex === headx && appley == heady){
            applex = Math.floor(Math.random() * tileamount)
            appley = Math.floor(Math.random() * tileamount)
            taillength++;
            score++;
        }
    },
    clearscreen: function clearscreen(){
        canv.fillStyle = "black";
        canv.fillRect(0, 0, canvas.width,canvas.height)
    },
    drawsnake: function drawsnake(){
        canv.fillStyle = "blue"
        canv.fillRect(headx * tileamount, heady * tileamount, tilesize, tilesize)

        canv.fillStyle = "lightblue"
        for(let i = 0; i < snakeparts.length; i++){
            let part = snakeparts[i]
            canv.fillRect(part.x * tileamount, part.y * tileamount, tilesize, tilesize)
        }

        snakeparts.push(new snake(headx, heady))
        if(snakeparts.length > taillength){
            snakeparts.shift()
        }
    },
    changesnakepos: function changesnakepos(){
        headx = headx + xvel
        heady = heady + yvel
    },
    drawapple: function drawapple(){
        canv.fillStyle = "red";
        canv.fillRect(applex * tileamount, appley * tileamount, tilesize, tilesize)
    },
    checkgameover: function checkgameover(){
        let gameover = false;
        if(xvel === 0 && xvel === 0){
            return false;
        }
        if(headx < 0){
            console.log("sds1")  
            gameover = true 
            
        }
        else if(headx === tileamount){
            console.log("sds2")
            gameover = true
            
        }
        else if(heady < 0){
            console.log("sds3")
            gameover = true
            
        }
        else if(heady === tileamount){
            console.log("sds4")
            gameover = true
            
        }


        for(let i = 0; i < snakeparts.length; i++){
            let part = snakeparts[i];
            if(part.x === headx && part.y === heady){
                gameover = true
            }
        }

        if (gameover){
            alert("you lost")
        }
        return gameover
    }
}




functions.updategame()


