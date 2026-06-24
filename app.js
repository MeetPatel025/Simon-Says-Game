let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level} | Highest Score: ${highestScore}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);

    console.log("Game Sequence:", gameseq);

    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            if (level > highestScore) {
                highestScore = level;
                localStorage.setItem("highestScore", highestScore);
            }

            setTimeout(levelup, 1000);
        }
    } else {
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Highest Score: <b>${highestScore}</b><br>Press any key to start`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    console.log("User Sequence:", userseq);
    console.log("Game Sequence:", gameseq);

    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}