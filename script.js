// Play Now Button

let playBtn = document.getElementById("playBtn");

if(playBtn){

    playBtn.onclick = function () {

        alert("🎮 Welcome to ASLEGEND Gaming World!");

    };

}


// Contact Button

let contactBtn = document.getElementById("contactBtn");

if(contactBtn){

    contactBtn.onclick = function () {

        alert("📧 Email: ayansaifi2168@email.com");

    };

}


// Logout Function

function logout(){

    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("name");

    window.location.href = "login.html";

}


// Loading Animation

let loading = document.getElementById("loading");

if(loading){

    window.addEventListener("load", function(){

        setTimeout(function(){

            loading.style.display="none";

        },1000);

    });

}


// Restart Game Function

function restartGame(){

    snake = [
        { x:200, y:200 }
    ];

    dx = box;
    dy = 0;

    score = 0;

    document.getElementById("score").innerText = score;

    gameSpeed = 150;

    gameOver = false;

    document.getElementById("gameOver").classList.add("hide");

    clearInterval(game);

    game = setInterval(updateGame, gameSpeed);

}

function restartGame(){

    clearInterval(game);

    snake = [
        {x:200, y:200}
    ];

    dx = box;
    dy = 0;

    score = 0;

    document.getElementById("score").innerText = score;

    gameOver = false;

    document.getElementById("gameOver").classList.add("hide");

    game = setInterval(updateGame, gameSpeed);

}