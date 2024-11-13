let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

//step 1 (keypress to game start)
document.addEventListener("keypress", function(){
    if(!started){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

//step 2 (level up and key flash)
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 100);
}

function levelUp(){
    userSeq = [];  //coz user have to enter the colors from starting
    level++;
    h2.innerText = `Level ${level}`;

    //choose random color
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    //add color in game seq array
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

//step 3
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        //if user have etered correct seq completely
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp(), 1000);
        }
    }else{
        highestScore = Math.max(level, highestScore);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start. <br> Highest Score ${highestScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset()
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);

    //add color in user seq
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);   //coz we checking color for the last idx only
};

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}