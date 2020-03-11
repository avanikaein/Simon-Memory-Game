//Game Variables
let order = [];
let playerOrder = [];
let flash;
let turn;
let correct;
let compTurn;
let intervalID;
let noise = true;
let on = false;
let win;


//Game Constants
const turnCounter = document.querySelector("#turn-counter");
const topLeft = document.querySelector("#top-left");
const topRight = document.querySelector("#top-right");
const bottomLeft = document.querySelector("#bottom-left");
const bottomRight = document.querySelector("#bottom-right");
const onButton = document.querySelector("#on-btn");
const startButton = document.querySelector("#start-btn");



//Game Functions
onButton.addEventListener('click', (event) => {
    if( onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "--";
    }else{
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalID);
    }
});

startButton.addEventListener ('click', (event) => {
        play();
});

function play(){
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalID = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    correct = true;
    for (var i = 0; i < 10; i++ ){
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalID = setInterval(gameTurn, 800);  
}


function gameTurn(){
    on = false;
    if (flash == turn){
        clearInterval(intervalID);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn){
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

// light up functions
function one(){
    if (noise){
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
};

function two(){
    if (noise){
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
};

function three(){
    if (noise){
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
};

function four(){
    if (noise){
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
};


function clearColor(){
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
};

function flashColor(){
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
};

topLeft.addEventListener('click', (event) => {
    if (on){
        playerOrder.push(1);
        check();
        one();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener('click', (event) => {
    if (on){
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener('click', (event) => {
    if (on){
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener('click', (event) => {
    if (on){
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check(){
    if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        correct = false;
    if (playerOrder.length == 11 && correct){
        winGame();
    }
    if (correct == false){
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();
            reset();
            correct = true;
            intervalID = setInterval(gameTurn, 800);
        }, 800);
        noise = false; 
    }
    if (turn == playerOrder.length && correct && !win){
        turn++;
        reset();
        turnCounter.innerHTML = turn;
        intervalID = setInterval(gameTurn, 800); 
    }
}

function winGame(){
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
    if (noise){
        let audio = document.getElementById("win");
        audio.play();
    }
    noise = true;
}

function reset(){
    playerOrder = [];
    compTurn = true;
    flash = 0;
}
