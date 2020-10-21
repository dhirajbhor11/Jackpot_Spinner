
let topSpeed = 0;


function createImageButton(id, src, event) {
    var button = document.createElement("img");
    button.src = src;
    button.id = id;
    button.onclick = event;
    return button;
}

let mainButton = document.getElementById('button');

function init() {
    var spinButton = createImageButton("spinButton", "img/Off-reveal my cocktail.png", spin);
    mainButton.appendChild(spinButton);


    var jackpot1 = ["img/ginger-beer.png", "img/lime-juice.png", "img/ice.png", "img/coffee-breaks.png", "img/espresso.png", "img/syrup.png", "img/ice-cubes.png", "img/lemon.png", "img/lemonade.png"];

    var moscowMule = ["img/ginger-beer.png", "img/lime-juice.png", "img/ice.png"];
    var freshLemonade = ["img/ice-cubes.png", "img/lemon.png", "img/lemonade.png"];
    var espressoMartini = ["img/coffee-breaks.png", "img/espresso.png", "img/syrup.png"];

    var max = 4;
    var min = 1;
    var imagesLength = jackpot1.length;

    var jackpot = Math.floor(Math.random() * (max - min) + min);
    var jackpotContent = [];

    switch (jackpot) {
        case 1: {
            jackpotContent = moscowMule;
            break;
        } case 2: {
            jackpotContent = freshLemonade;
            break;
        } case 3: {
            jackpotContent = espressoMartini;
            break;
        }
    }

    console.log(jackpotContent);

    shuffle(jackpot1);
    for (var i = 0; i < imagesLength; i++) {
        if (i == imagesLength - 2) {
            document.getElementById("items1").appendChild(getImage(jackpotContent[0]));
        } else {

            document.getElementById("items1").appendChild(getImage(jackpot1[i]));
        }
    }

    shuffle(jackpot1);
    for (var i = 0; i < imagesLength; i++) {
        if (i == imagesLength - 2) {
            document.getElementById("items2").appendChild(getImage(jackpotContent[1]));
        } else {
            document.getElementById("items2").appendChild(getImage(jackpot1[i]));
        }
    }

    shuffle(jackpot1);

    for (var i = 0; i < imagesLength; i++) {
        if (i == imagesLength - 2) {
            document.getElementById("items3").appendChild(getImage(jackpotContent[2]));
        } else {
            document.getElementById("items3").appendChild(getImage(jackpot1[i]));
        }
    }


}

var interval1, interval2, interval3, interval1Anti, interval2Anti, interval3Anti;
var mainInterval1, mainIntervalAnti1, mainInterval2, mainIntervalAnti2, mainInterval3, mainIntervalAnti3;
let topEnd = -52, bottomEnd = -400;
let item1Top = -52, item2Top = -52, item3Top = -52;
let itTouch1 = false, itTouch2 = false, itTouch3 = false;



function spin() {
    var speed = 0.005;
    var time = 100;

    var removedButton = document.getElementById("spinButton");

    mainButton.removeChild(removedButton);
    mainButton.appendChild(createImageButton("spinningButton", "img/on-reveal my cocktail.png", " "));

    spinFast(time);

    setTimeout(() => {
        spinSlow(time);
        setTimeout(() => {
            stop();
        }, 1000);
    }, 2000);


}

function spinFast(time) {
    clearInterval(interval1);
    clearInterval(interval1Anti);
    clearInterval(mainInterval1);
    clearInterval(mainIntervalAnti1);
    spin1(1, time);

    clearInterval(interval2);
    clearInterval(interval2Anti);
    clearInterval(mainInterval2);
    clearInterval(mainIntervalAnti2);
    spin2(5, time);

    clearInterval(interval3);
    clearInterval(interval3Anti);
    clearInterval(mainInterval3);
    clearInterval(mainIntervalAnti3);
    spin3(7, time);
}

function spinSlow(time) {

    clearInterval(interval1);
    clearInterval(interval1Anti);
    clearInterval(mainInterval1);
    clearInterval(mainIntervalAnti1);
    spin1(12, time);

    clearInterval(interval2);
    clearInterval(interval2Anti);
    clearInterval(mainInterval2);
    clearInterval(mainIntervalAnti2);
    spin2(10, time);

    clearInterval(interval3);
    clearInterval(interval3Anti);
    clearInterval(mainInterval3);
    clearInterval(mainIntervalAnti3);
    spin3(12, time);
}

let itStopped1, itStopped2, itStopped3;

function stop() {

    console.log("item1:" + item1Top + " item2:" + item2Top + " item3:" + item3Top);

    var stopInterval1 = setInterval(() => {
        if (item1Top >= -365 && item1Top <= -350) {
            item1Top = -358;
            clearInterval(interval1);
            clearInterval(interval1Anti);
            clearInterval(mainInterval1);
            clearInterval(mainIntervalAnti1);
            document.getElementById("items1").style.top = item1Top;
            itStopped1 = true;
            clearInterval(stopInterval1);
        }
    }, 100);


    var stopInterval2 = setInterval(() => {
        if (item2Top >= -365 && item2Top <= -350) {
            item2Top = -359;
            clearInterval(interval2);
            clearInterval(interval2Anti);
            clearInterval(mainInterval2);
            clearInterval(mainIntervalAnti2);
            document.getElementById("items2").style.top = item2Top;
            itStopped2 = true;
            clearInterval(stopInterval2);
        }
    }, 100);


    var stopInterval3 = setInterval(() => {
        if (item3Top >= -365 && item3Top <= -350) {
            item3Top = -358;
            clearInterval(interval3);
            clearInterval(interval3Anti);
            clearInterval(mainInterval3);
            clearInterval(mainIntervalAnti3);
            document.getElementById("items3").style.top = item3Top;
            itStopped3 = true;
            clearInterval(stopInterval3);
        }
    }, 100);


    var buttonInterval = setInterval(() => {
        if (itStopped1 && itStopped2 && itStopped3) {
            var removedButton = document.getElementById("spinningButton");
            mainButton.removeChild(removedButton);
            mainButton.appendChild(createImageButton("jackpot", "img/Jackpot.png", " "));
            clearInterval(buttonInterval);
        }
    }, 100);
}

function spin1(speed, time) {
    interval1 = spinReel1(speed);
    mainInterval1 = setInterval(() => {
        if (itTouch1) {
            clearInterval(interval1);
            spin1Anti(speed);
            clearInterval(mainInterval1);
        }
    }, time);
}

function spin1Anti(speed, time) {
    interval1Anti = spinReel1Anti(speed);
    mainIntervalAnti1 = setInterval(() => {
        if (!itTouch1) {
            clearInterval(interval1Anti);
            spin1(speed);
            clearInterval(mainIntervalAnti1);
        }
    }, time);
}

function spinReel1(speed) {
    return setInterval(() => {
        document.getElementById("items1").style.top = (++item1Top + topSpeed) + "%";
        if (item1Top >= topEnd) {
            itTouch1 = true;
        }
    }, speed);
}

function spinReel1Anti(speed) {
    return setInterval(() => {
        document.getElementById("items1").style.top = (--item1Top - topSpeed) + "%";
        if (item1Top <= bottomEnd) {
            itTouch1 = false;
        }
    }, speed);
}





function spin2(speed, time) {
    interval2 = spinReel2(speed);
    mainInterval2 = setInterval(() => {
        if (itTouch2) {
            clearInterval(interval2);
            spin2Anti(speed);
            clearInterval(mainInterval2);
        }
    }, time);
}

function spin2Anti(speed, time) {
    interval2Anti = spinReel2Anti(speed);
    mainIntervalAnti2 = setInterval(() => {
        if (!itTouch2) {
            clearInterval(interval2Anti);
            spin2(speed);
            clearInterval(mainIntervalAnti2);
        }
    }, time);
}

function spinReel2(speed) {
    return setInterval(() => {
        document.getElementById("items2").style.top = (++item2Top + topSpeed) + "%";
        if (item2Top >= topEnd) {
            itTouch2 = true;
        }
    }, speed);
}

function spinReel2Anti(speed) {
    return setInterval(() => {
        document.getElementById("items2").style.top = (--item2Top - topSpeed) + "%";
        if (item2Top <= bottomEnd) {
            itTouch2 = false;
        }
    }, speed);
}

function spin3(speed, time) {
    interval3 = spinReel3(speed);
    mainInterval3 = setInterval(() => {
        if (itTouch3) {
            clearInterval(interval3);
            spin3Anti(speed);
            clearInterval(mainInterval3);
        }
    }, time);
}

function spin3Anti(speed, time) {
    interval3Anti = spinReel3Anti(speed);
    mainIntervalAnti3 = setInterval(() => {
        if (!itTouch3) {
            clearInterval(interval3Anti);
            spin3(speed);
            clearInterval(mainIntervalAnti3);
        }
    }, time);
}


function spinReel3(speed) {
    return setInterval(() => {
        document.getElementById("items3").style.top = (++item3Top + topSpeed) + "%";
        if (item3Top >= topEnd) {
            itTouch3 = true;
        }
    }, speed);
}

function spinReel3Anti(speed) {
    return setInterval(() => {
        document.getElementById("items3").style.top = (--item3Top - topSpeed) + "%";
        if (item3Top <= bottomEnd) {
            itTouch3 = false;
        }
    }, speed);
}
































function getImage(src) {
    var img = document.createElement('img');
    img.src = src;
    return img;
}



function getCombinations(value) {
    var Moscow_male = ["ginger", "lime-juce", "ice"];
    var fresh_lemonade = ["ice-cube", "lemon", "lemonade"];
    var espresso_martini = ["coffe", "espresso", "syrup"];


    switch (value) {
        case 1: {
            return Moscow_male;
        }
        case 2: {
            return fresh_lemonade;
        }
        case 3: {
            return espresso_martini;
        }
    }

    return null;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

init();