/* =========================================================
   RIMMI LOVE WEBSITE
   Made by Mehboob 💙
   ========================================================= */


/* =========================================================
   BASIC SCREEN SYSTEM
   ========================================================= */

const screens = [
    document.getElementById("screen1"),
    document.getElementById("screen2"),
    document.getElementById("screen3"),
    document.getElementById("screen4"),
    document.getElementById("screen5"),
    document.getElementById("screen6"),
    document.getElementById("screen7")
];


let currentScreen = 0;


function showScreen(number) {

    if (
        number < 0 ||
        number >= screens.length
    ) {
        return;
    }


    screens[currentScreen].classList.remove("active");


    currentScreen = number;


    screens[currentScreen].classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Teddy comes alive when its screen opens */

    if (number === 5) {

        setTimeout(
            startTeddySpeech,
            800
        );

    }
}


/* =========================================================
   SCREEN NAVIGATION
   ========================================================= */

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        function () {

            showScreen(1);

        }
    );


document
    .getElementById("skipFeelings")
    .addEventListener(
        "click",
        function () {

            showScreen(2);

        }
    );


document
    .getElementById("rainButton")
    .addEventListener(
        "click",
        function () {

            startLoveRain();

        }
    );


document
    .getElementById("teddyButton")
    .addEventListener(
        "click",
        function () {

            showScreen(5);

        }
    );


document
    .getElementById("finalButton")
    .addEventListener(
        "click",
        function () {

            showScreen(6);

            createFinalHearts();

        }
    );


/* =========================================================
   MUSIC
   ========================================================= */

const loveSong =
    document.getElementById("loveSong");


const musicButton =
    document.getElementById("musicButton");


const musicStatus =
    document.getElementById("musicStatus");


let musicPlaying = false;


function updateMusicUI() {

    if (musicPlaying) {

        musicButton.innerHTML =
            "🎵 Our Song is Playing <span>❚❚</span>";

        musicStatus.textContent =
            "Playing just for you 💙";

    } else {

        musicButton.innerHTML =
            "🎵 Play Our Song <span>▶</span>";

        musicStatus.textContent =
            "Tap once to start our song 💙";
    }
}


async function toggleMusic() {

    try {

        if (
            loveSong.paused
        ) {

            await loveSong.play();

            musicPlaying = true;

        } else {

            loveSong.pause();

            musicPlaying = false;

        }

        updateMusicUI();

    } catch (error) {

        console.error(
            "Music error:",
            error
        );


        musicStatus.textContent =
            "love.mp3 check karo — filename exactly love.mp3 hona chahiye.";

    }
}


musicButton.addEventListener(
    "click",
    toggleMusic
);


loveSong.addEventListener(
    "play",
    function () {

        musicPlaying = true;

        updateMusicUI();

    }
);


loveSong.addEventListener(
    "pause",
    function () {

        musicPlaying = false;

        updateMusicUI();

    }
);


loveSong.addEventListener(
    "error",
    function () {

        musicStatus.textContent =
            "Music file nahi mil rahi. love.mp3 ko GitHub root mein rakho.";

    }
);


/* =========================================================
   PHOTO ALBUM
   ========================================================= */

const totalPhotos = 10;


let photoIndex = 1;


const photo =
    document.getElementById("photo");


const photoWrap =
    document.getElementById("photoWrap");


const photoError =
    document.getElementById("photoError");


const counter =
    document.getElementById("counter");


const dots =
    document.getElementById("dots");


/* Create dots */

for (
    let i = 1;
    i <= totalPhotos;
    i++
) {

    const dot =
        document.createElement("span");

    dot.className =
        "dot";


    if (i === 1) {

        dot.classList.add(
            "active"
        );

    }


    dot.addEventListener(
        "click",
        function () {

            setPhoto(i);

        }
    );


    dots.appendChild(dot);
}


/* =========================================================
   PHOTO ERROR HANDLING
   ========================================================= */

photo.addEventListener(
    "error",
    function () {

        photo.style.display =
            "none";

        photoError.style.display =
            "flex";

    }
);


photo.addEventListener(
    "load",
    function () {

        photo.style.display =
            "block";

        photoError.style.display =
            "none";

    }
);


/* =========================================================
   CHANGE PHOTO
   ========================================================= */

function setPhoto(number) {

    if (number < 1) {

        number =
            totalPhotos;

    }


    if (number > totalPhotos) {

        number = 1;

    }


    photoIndex = number;


    /* Smooth transition */

    photo.style.opacity =
        "0";

    photo.style.transform =
        "scale(.96)";


    setTimeout(
        function () {

            /*
               IMPORTANT:
               Images are in ROOT.
               Therefore:
               ./rm1.jpg
               ./rm2.jpg
               ...
            */

            photo.src =
                "./rm" +
                photoIndex +
                ".jpg";


            counter.textContent =
                photoIndex +
                " / " +
                totalPhotos;


            const allDots =
                dots.querySelectorAll(".dot");


            allDots.forEach(
                function (dot, index) {

                    dot.classList.toggle(
                        "active",
                        index === photoIndex - 1
                    );

                }
            );


            photo.style.opacity =
                "1";

            photo.style.transform =
                "scale(1)";

        },
        150
    );
}


/* =========================================================
   ALBUM BUTTONS
   ========================================================= */

document
    .getElementById("nextPhotoButton")
    .addEventListener(
        "click",
        function () {

            setPhoto(
                photoIndex + 1
            );

        }
    );


document
    .getElementById("nextPhotoRound")
    .addEventListener(
        "click",
        function () {

            setPhoto(
                photoIndex + 1
            );

        }
    );


document
    .getElementById("prevButton")
    .addEventListener(
        "click",
        function () {

            setPhoto(
                photoIndex - 1
            );

        }
    );


/* =========================================================
   MOBILE SWIPE
   ========================================================= */

let touchStartX = 0;

let touchStartY = 0;


photoWrap.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    {
        passive: true
    }
);


photoWrap.addEventListener(
    "touchend",
    function (event) {

        const endX =
            event.changedTouches[0].screenX;

        const endY =
            event.changedTouches[0].screenY;


        const differenceX =
            endX -
            touchStartX;


        const differenceY =
            endY -
            touchStartY;


        /*
           Only treat it as swipe if
           horizontal movement is bigger.
        */

        if (
            Math.abs(differenceX) > 45 &&
            Math.abs(differenceX) >
            Math.abs(differenceY)
        ) {

            if (
                differenceX < 0
            ) {

                setPhoto(
                    photoIndex + 1
                );

            } else {

                setPhoto(
                    photoIndex - 1
                );

            }

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   LOVE RAIN
   ========================================================= */

let rainRunning = false;


function startLoveRain() {

    if (rainRunning) {

        return;

    }


    rainRunning = true;


    showScreen(3);


    const rainContainer =
        document.getElementById(
            "loveRain"
        );


    const startTime =
        Date.now();


    const emojis = [
        "💙",
        "💋",
        "💙",
        "❤️",
        "💙",
        "💋"
    ];


    const rainInterval =
        setInterval(
            function () {

                /*
                   Multiple particles
                   at a time.
                */

                for (
                    let i = 0;
                    i < 5;
                    i++
                ) {

                    createRainParticle(
                        rainContainer,
                        emojis
                    );

                }


                /*
                   Exactly about 10 seconds
                */

                if (
                    Date.now() -
                    startTime >=
                    10000
                ) {

                    clearInterval(
                        rainInterval
                    );


                    setTimeout(
                        function () {

                            rainRunning =
                                false;

                            showScreen(4);

                        },
                        800
                    );

                }

            },
            180
        );
}


function createRainParticle(
    container,
    emojis
) {

    const particle =
        document.createElement("div");


    particle.className =
        "rain-particle";


    particle.textContent =
        emojis[
            Math.floor(
                Math.random() *
                emojis.length
            )
        ];


    particle.style.left =
        Math.random() *
        100 +
        "vw";


    particle.style.fontSize =
        (
            16 +
            Math.random() *
            22
        ) +
        "px";


    particle.style.animationDuration =
        (
            3 +
            Math.random() *
            4
        ) +
        "s";


    particle.style.setProperty(
        "--drift",
        (
            Math.random() *
            180 -
            90
        ) +
        "px"
    );


    particle.style.setProperty(
        "--rotation",
        (
            Math.random() *
            360 -
            180
        ) +
        "deg"
    );


    container.appendChild(
        particle
    );


    setTimeout(
        function () {

            particle.remove();

        },
        8000
    );
}


/* =========================================================
   GIFT
   ========================================================= */

const gift =
    document.getElementById("gift");


const giftInstruction =
    document.getElementById(
        "giftInstruction"
    );


const giftLetter =
    document.getElementById(
        "giftLetter"
    );


let giftOpened = false;


gift.addEventListener(
    "click",
    function () {

        if (giftOpened) {

            return;

        }


        giftOpened = true;


        gift.classList.add(
            "open"
        );


        giftInstruction.style.display =
            "none";


        setTimeout(
            function () {

                giftLetter.classList.add(
                    "show"
                );

            },
            450
        );

    }
);


/* =========================================================
   TEDDY SPEECH
   ========================================================= */

let teddySpeechStarted =
    false;


function startTeddySpeech() {

    if (
        teddySpeechStarted
    ) {

        return;

    }


    teddySpeechStarted =
        true;


    /*
       Browser speech support
       varies by phone/browser.
    */

    if (
        "speechSynthesis"
        in window
    ) {

        /*
           Stop previous speech.
        */

        window.speechSynthesis.cancel();


        speakText(
            "I love you Rimmi Jaanu"
        );


        setTimeout(
            function () {

                speakText(
                    "I love you darling"
                );

            },
            3500
        );

    }

}


function speakText(text) {

    try {

        const speech =
            new SpeechSynthesisUtterance(
                text
            );


        speech.lang =
            "en-IN";


        speech.rate =
            0.82;


        speech.pitch =
            1.15;


        speech.volume =
            1;


        window.speechSynthesis.speak(
            speech
        );

    } catch (error) {

        console.log(
            "Speech unavailable"
        );

    }
}


/* =========================================================
   FINAL HEARTS
   ========================================================= */

function createFinalHearts() {

    const container =
        document.getElementById(
            "backgroundHearts"
        );


    const emojis = [
        "💙",
        "💙",
        "💋",
        "✨",
        "❤️"
    ];


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() *
            100 +
            "vw";


        heart.style.top =
            (
                20 +
                Math.random() *
                80
            ) +
            "vh";


        heart.style.fontSize =
            (
                12 +
                Math.random() *
                18
            ) +
            "px";


        heart.style.opacity =
            ".7";


        heart.style.pointerEvents =
            "none";


        heart.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        heart.style.animation =
            "finalHeartFloat " +
            (
                3 +
                Math.random() * 4
            ) +
            "s ease-in-out infinite";


        container.appendChild(
            heart
        );

    }
}


/* =========================================================
   INITIAL CHECK
   ========================================================= */

setPhoto(1);

updateMusicUI();


/*
   Console message for easy debugging.
*/

console.log(
    "💙 Rimmi Love website loaded."
);

console.log(
    "Photos expected: rm1.jpg ... rm10.jpg"
);

console.log(
    "Music expected: love.mp3"
);
