/* =========================
   OPENING SCREEN
========================= */

const lines = [
    document.getElementById("line1"),
    document.getElementById("line2"),
    document.getElementById("line3"),
    document.getElementById("line4"),
    document.getElementById("line5")
];

const systemReady = document.getElementById("systemReady");

const enterButton = document.getElementById("enterButton");

const loadingScreen = document.getElementById("loadingScreen");

const mainWebsite = document.getElementById("mainWebsite");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


let delay = 700;


/* Show terminal lines */

lines.forEach((line, index) => {

    setTimeout(() => {

        line.classList.add("visible");

    }, delay * (index + 1));

});


/* Show "all systems ready" */

setTimeout(() => {

    systemReady.classList.add("visible");

}, delay * (lines.length + 1));


/* Enter website */

enterButton.addEventListener("click", () => {

    loadingScreen.style.opacity = "0";

    loadingScreen.style.visibility = "hidden";


    /* Start music */

    if (backgroundMusic) {

    backgroundMusic.volume = 0.25;

    backgroundMusic.play().catch(() => {
        console.log("Music could not start.");
    });
}


    setTimeout(() => {

        mainWebsite.classList.add("visible");

        document.body.style.overflow = "auto";

    }, 700);

});
/* =========================
   MUSIC CONTROLS
========================= */

musicButton.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        backgroundMusic.play();

        musicButton.textContent = "♫ MUSIC ON";

    } else {

        backgroundMusic.pause();

        musicButton.textContent = "♫ MUSIC OFF";

    }

});

     
/* =========================
   MUSIC CONTROLS
========================= */


/* =========================
   MEMORY MATCH GAME
========================= */

const gameBoard = document.getElementById("gameBoard");

const gameStatus = document.getElementById("gameStatus");


/*
   Six pairs.

   For now these are temporary symbols.
   Later we will replace them with
   Keziah's actual photos.
*/

const memories = [
    "assets/photos/memory1.jpg",
    "assets/photos/memory2.jpg",
    "assets/photos/memory3.jpg",
    "assets/photos/memory4.jpg",
    "assets/photos/memory5.jpg",
    "assets/photos/memory6.jpg"
];


/* Create two of every memory */

let cards = [...memories, ...memories];


/* Shuffle cards */

cards.sort(() => Math.random() - 0.5);


let firstCard = null;

let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;


/* =========================
   CREATE CARDS
========================= */

cards.forEach((memory) => {

    const card = document.createElement("div");

    card.classList.add("memory-card");

    card.dataset.memory = memory;


   card.innerHTML = `

    <div class="card-inner">

        <div class="card-front">
            ♡
        </div>

        <div class="card-back">
            <img src="${memory}" alt="A memory">
        </div>

    </div>

`;


    card.addEventListener("click", () => {

        flipCard(card);

    });


    gameBoard.appendChild(card);

});


/* =========================
   FLIP CARD
========================= */

function flipCard(card) {

    if (lockBoard) return;

    if (card === firstCard) return;

    if (card.classList.contains("matched")) return;


    card.classList.add("flipped");


    if (!firstCard) {

        firstCard = card;

        return;

    }


    secondCard = card;

    checkMatch();

}


/* =========================
   CHECK MATCH
========================= */

function checkMatch() {

    const match =
        firstCard.dataset.memory ===
        secondCard.dataset.memory;


    if (match) {

        matched();

    } else {

        unflipCards();

    }

}


/* =========================
   MATCHED
========================= */

function matched() {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.classList.add("just-matched");
    secondCard.classList.add("just-matched");

    setTimeout(() => {
        firstCard.classList.remove("just-matched");
        secondCard.classList.remove("just-matched");
    }, 500);

    matchedPairs++;

    gameStatus.textContent =
        `${matchedPairs} / 6 memories unlocked`;

    resetBoard();

    if (matchedPairs === 6) {

        gameComplete();

    }

}


/* =========================
   NOT A MATCH
========================= */

function unflipCards() {

    lockBoard = true;


    setTimeout(() => {

        firstCard.classList.remove("flipped");

        secondCard.classList.remove("flipped");


        resetBoard();

    }, 900);

}


/* =========================
   RESET
========================= */

function resetBoard() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


/* =========================
   GAME COMPLETE
========================= */

function gameComplete() {

    setTimeout(() => {

        gameStatus.textContent =
            "all six memories unlocked ♡";


        const message = document.createElement("div");

        message.classList.add("game-complete-message");

        message.innerHTML = `
            <p>
                you found every memory. ♡
            </p>

            <button class="continue-button">
                CONTINUE →
            </button>
        `;


        gameBoard.parentElement.appendChild(message);


        setTimeout(() => {

            message.classList.add("visible");

        }, 100);


        const continueButton =
            message.querySelector(".continue-button");


        continueButton.addEventListener("click", () => {

            document.getElementById("memoryGame").style.display =
                "none";

            document.getElementById("secretUnlock")
                .classList.add("visible");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }, 700);

}
/* =========================
   SECRET UNLOCK
========================= */

const secretAnswer =
    document.getElementById("secretAnswer");

const verifyButton =
    document.getElementById("verifyButton");

const secretMessage =
    document.getElementById("secretMessage");


verifyButton.addEventListener("click", checkSecretAnswer);


secretAnswer.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        checkSecretAnswer();

    }

});


function checkSecretAnswer() {

    const answer =
        secretAnswer.value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");


    if (answer === "mousebird") {

        secretMessage.textContent =
            "ACCESS GRANTED ✓ welcome back, keziah ♡";

        secretMessage.style.color = "#c76d91";

        secretAnswer.disabled = true;

        verifyButton.disabled = true;

        verifyButton.textContent =
            "ACCESS GRANTED ✓";


        /* Show the letter */

        setTimeout(() => {

            document.getElementById("secretUnlock").style.display =
                "none";

            document.getElementById("letterSection")
                .classList.add("visible");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 1800);


    } else {

        secretMessage.textContent =
            "ACCESS DENIED ✕ ...really, keziah? 😭";

        secretMessage.style.color = "#a85c78";

        secretAnswer.value = "";

        secretAnswer.focus();

    }

}
/* =========================
   LETTER SECTION
========================= */

const letterSection =
    document.getElementById("letterSection");

const letterContinue =
    document.getElementById("letterContinue");


/* Show letter after secret is unlocked */

/* =========================
   KEZIAH'S 19-CANDLE CAKE
========================= */

const cakeSection = document.getElementById("cakeSection");
const blowInstruction = document.getElementById("blowInstruction");
const wishMessage = document.getElementById("wishMessage");
const candles = document.querySelectorAll(".candle");

let microphoneStream = null;
let microphoneActive = false;
let candlesBlown = false;


/* =========================
   SHOW THE CAKE
========================= */

function showBirthdayCake() {

    cakeSection.classList.add("visible");

    cakeSection.scrollIntoView({
        behavior: "smooth"
    });

    startBlowDetection();

}


/* =========================
   MICROPHONE
========================= */

async function startBlowDetection() {

    if (microphoneActive) return;

    try {

        microphoneStream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

        microphoneActive = true;

        const audioContext =
            new (window.AudioContext ||
            window.webkitAudioContext)();

        const microphone =
            audioContext.createMediaStreamSource(
                microphoneStream
            );

        const analyser =
            audioContext.createAnalyser();

        analyser.fftSize = 512;

        microphone.connect(analyser);

        const data =
            new Uint8Array(
                analyser.fftSize
            );

        function listenForBlow() {

            if (candlesBlown) return;

            analyser.getByteTimeDomainData(data);

            let total = 0;

            for (let i = 0; i < data.length; i++) {

                const value =
                    (data[i] - 128) / 128;

                total += value * value;

            }

            const volume =
                Math.sqrt(total / data.length);

            if (volume > 0.18) {

                blowOutCandles();

            }

            requestAnimationFrame(listenForBlow);

        }

        listenForBlow();

    } catch (error) {

        console.log(
            "Microphone permission was not available.",
            error
        );

        blowInstruction.textContent =
            "Tap the candles to make your wish ♡";

    }

}


/* =========================
   BLOW OUT ALL 19 CANDLES
========================= */

function blowOutCandles() {

    if (candlesBlown) return;

    candlesBlown = true;

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add("blown");

        }, index * 40);

    });

    setTimeout(() => {

        blowInstruction.textContent =
            "19 candles. One very special girl. ♡";

        wishMessage.textContent =
            "Love you ♡";

        cakeSection.classList.add(
            "celebrating"
        );

        createConfetti();

    }, 1000);

}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    for (let i = 0; i < 45; i++) {

        const piece =
            document.createElement("div");

        piece.textContent = "✦";

        piece.style.position = "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top = "-20px";

        piece.style.fontSize =
            (12 + Math.random() * 18) + "px";

        piece.style.zIndex = "9999";

        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const fall =
            piece.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        2000 + Math.random() * 2000,

                    easing: "ease-out"
                }
            );

        fall.onfinish = () => {

            piece.remove();

        };

    }

}
/* =========================
   ONE LAST THING → CAKE
========================= */

const oneLastThingButton = Array.from(
    document.querySelectorAll("button")
).find(button =>
    button.textContent.includes("ONE LAST THING")
);

if (oneLastThingButton) {

    oneLastThingButton.addEventListener("click", () => {

        showBirthdayCake();

    });

}


