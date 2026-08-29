// Canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Sounds

let eatSound = document.getElementById("eatSound");
let goldSound = document.getElementById("goldSound");
let shieldSound = document.getElementById("shieldSound");
let gameOverSound = document.getElementById("gameOverSound");

// Grid Size
const box = 20;

// Snake
let snake = [
    { x: 200, y: 200 }
];

// Direction
let dx = box;
let dy = 0;

// Food
let food = {
    x: 100,
    y: 100
};

// Golden Apple
let goldenFood = {
    x: -20,
    y: -20
};

let goldenVisible = false;

// Shield
let shield = {
    x: -20,
    y: -20
};

let shieldVisible = false;
let shieldActive = false;
let shieldTimer;

// Poison
let poison = {
    x: 340,
    y: 340
};

// Rocks
let rocks = [
    { x: 80, y: 80 },
    { x: 300, y: 120 },
    { x: 180, y: 300 }
];

// Score
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let level = 1;
let lives = 3;

document.getElementById("score").innerText = score;
document.getElementById("highscore").innerText = highScore;
document.getElementById("level").innerText = level;
document.getElementById("lives").innerText = lives;

// Game
let gameSpeed = 150;
let game;
let gameOver = false;

// Random Food
function randomFood(){

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

}

// Random Golden Apple
function randomGoldenFood(){

    goldenFood = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

}

// Random Shield
function randomShield(){

    shield = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

}

// Random Poison
function randomPoison(){

    poison = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

}

// Draw Snake
function drawSnake(){

    snake.forEach(function(part,index){

        if(index === 0){

            if(shieldActive){
                ctx.fillStyle = "maroon";
            }
            else{
                ctx.fillStyle = "black";
            }

        }
        else{

            ctx.fillStyle = "yellow";

        }

        ctx.fillRect(part.x, part.y, box, box);

    });

}

// Draw Food
function drawFood(){

    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.arc(food.x + box/2, food.y + box/2, box/2, 0, Math.PI*2);
    ctx.fill();

}

// Draw Golden Apple
function drawGoldenFood(){

    if(!goldenVisible){
        return;
    }

    ctx.fillStyle = "gold";

    ctx.beginPath();

    ctx.arc(
        goldenFood.x + box/2,
        goldenFood.y + box/2,
        box/2,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


// Draw Shield
function drawShield(){

    if(!shieldVisible){
        return;
    }

    ctx.fillStyle = "maroon";

    ctx.beginPath();

    ctx.arc(
        shield.x + box/2,
        shield.y + box/2,
        box/2,
        0,
        Math.PI * 2
    );

    ctx.fill();

}

// Draw Poison
function drawPoison(){

    ctx.fillStyle = "purple";

    ctx.beginPath();
    ctx.arc(poison.x + box/2, poison.y + box/2, box/2, 0, Math.PI*2);
    ctx.fill();

}

// Draw Rocks
function drawRocks(){

    ctx.fillStyle = "gray";

    rocks.forEach(function(rock){

        ctx.fillRect(rock.x, rock.y, box, box);

    });

}

// Main Game Function
function updateGame(){

    if(gameOver){
        return;
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);

    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    // Screen Wrap
    if(head.x >= canvas.width) head.x = 0;
    if(head.x < 0) head.x = canvas.width - box;
    if(head.y >= canvas.height) head.y = 0;
    if(head.y < 0) head.y = canvas.height - box;

// Rock Collision
for(let rock of rocks){

    if(head.x == rock.x && head.y == rock.y){

        // Shield Active
        if(shieldActive){

            return;

        }

        // No Shield
        lives--;

        document.getElementById("lives").innerText = lives;

        if(lives <= 0){

            gameOver = true;

            clearInterval(game);

            document.getElementById("gameOver").classList.remove("hide");

            return;

        }

        // Reset Snake Position
        snake = [
            { x:200, y:200 }
        ];

        dx = box;
        dy = 0;

        return;

    }

}

    // Body Collision
    for(let i = 1; i < snake.length; i++){

        if(head.x == snake[i].x && head.y == snake[i].y){

            gameOver = true;
            clearInterval(game);
            document.getElementById("gameOver").classList.remove("hide");
            return;

        }

    }
    
        // Add Head
    snake.unshift(head);

// Food Eat
if(head.x == food.x && head.y == food.y){

    score++;
    document.getElementById("score").innerText = score;
    
    eatSound.play();

    // Level System
    if(score % 5 == 0){

        level++;
        document.getElementById("level").innerText = level;

        // Speed Increase
        if(gameSpeed > 50){
            gameSpeed -= 10;

            clearInterval(game);
            game = setInterval(updateGame, gameSpeed);
        }

    }

    randomFood();

}
else{

    snake.pop();

}

// Golden Apple Eat
if(goldenVisible &&
   head.x == goldenFood.x &&
   head.y == goldenFood.y){
     goldSound.play();

    score += 5;
    document.getElementById("score").innerText = score;

    goldenVisible = false;
    randomGoldenFood();

}

// Shield Eat

if(shieldVisible &&
   head.x == shield.x &&
   head.y == shield.y){
     
     shieldSound.play();

    shieldVisible = false;

    shieldActive = true;

    clearTimeout(shieldTimer);

    shieldTimer = setTimeout(function(){

        shieldActive = false;

    },10000);

}

// Poison Collision

if(head.x == poison.x && head.y == poison.y){

    // Shield Active
    if(shieldActive){

        return;

    }

    // No Shield
    lives--;

    document.getElementById("lives").innerText = lives;

    if(lives <= 0){

        gameOver = true;

        clearInterval(game);
        
        gameOverSound.play();

        document.getElementById("gameOver").classList.remove("hide");

        return;

    }

    // Reset Snake Position
    snake = [
        { x:200, y:200 }
    ];

    dx = box;
    dy = 0;

    randomPoison();

    return;

}

    // Draw Everything
    drawFood();
    drawGoldenFood();
    drawShield();
    drawPoison();
    drawRocks();
    drawSnake();

}

//First time random poison
randomFood();
randomPoison();

// Start Game
game = setInterval(updateGame, gameSpeed);

// Golden Apple Spawn

setInterval(function(){

    goldenVisible = true;

    randomGoldenFood();

    setTimeout(function(){

        goldenVisible = false;

    },5000);

},10000);

// Shield Spawn

setInterval(function(){

    shieldVisible = true;

    randomShield();

    setTimeout(function(){

        shieldVisible = false;

    },8000);

},20000);

// Mobile Controls

function moveUp(){

    if(dy != box){

        dx = 0;
        dy = -box;

    }

}

function moveDown(){

    if(dy != -box){

        dx = 0;
        dy = box;

    }

}

function moveLeft(){

    if(dx != box){

        dx = -box;
        dy = 0;

    }

}

function moveRight(){

    if(dx != -box){

        dx = box;
        dy = 0;

    }

}


// Restart Game

function restartGame(){

    clearInterval(game);

    snake = [
        { x:200, y:200 }
    ];

    dx = box;
    dy = 0;

    score = 0;
    
    lives = 3;
document.getElementById("lives").innerText = lives;

shieldActive = false;
shieldVisible = false;

    gameOver = false;

    document.getElementById("score").innerText = score;
    document.getElementById("gameOver").classList.add("hide");

    randomFood();
    randomPoison();

    game = setInterval(updateGame, gameSpeed);

}
