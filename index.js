var directions = ["up", "right", "down", "left"]; //array consisting directos
var clickPattern = []; //stores click seq
var gamePattern = []; //stores game seq
var started = false; //indicates game start
var level = 0; //indicates level

// Main functions

// generates a random no. which is used to pull a random directo from our array, pushes it to gamePattern, plays relevant sound & animates relvant div
function nextDirecto() {
    started = true;
    level++;
    $("h1").text("Level " + level);

    var next = directions[Math.floor(Math.random() * 4)];
    gamePattern.push(next);
    console.log(next);
    
    display(next);
}

// if its a first click then updates heading, reset clickpattern & calls a function generating seq
$(".start").on("click", function() {
    if(!started) {
        $(".head").html("<h1></h1>");
        $(".head .start").remove();
        $("h1").text("Level " + level);
        clickPattern = [];
        nextDirecto();
    }
})

// listen's to clicks on divs, pushes them to clickPattern, plays relevant sound & animates, passes current index to check function
$(".box").on("click", function(event) {
    var thisDirecto = (event.currentTarget.id);
    clickPattern.push(thisDirecto);
        
    playSound(thisDirecto);
    animate(thisDirecto);
    check(clickPattern.length - 1);
})

//listens to keydowns, creates a var to store the pressed key, passes it to keyPress & check
$(document).on("keydown", function(event) {
    var thisDirecto = (event.key);
    keyPress(thisDirecto);
    check(clickPattern.length - 1);
});

//depending upon the key pressed names,pushes & passes the name of the key to play its sound & animate the relevant arrow
function keyPress(key) {
    switch (key) {

        case "ArrowUp":
            var keyName = "up";
            clickPattern.push(keyName);
            playSound(keyName);
            animate(keyName);
        break;

        case "ArrowRight":
            var keyName = "right";
            clickPattern.push(keyName);
            playSound(keyName);
            animate(keyName);
        break;

        case "ArrowDown":
            var keyName = "down";
            clickPattern.push(keyName);
            playSound(keyName);
            animate(keyName);
        break;

        case "ArrowLeft":
            var keyName = "left";
            clickPattern.push(keyName);
            playSound(keyName);
            animate(keyName);
        break;

        default: console.log(key);
        break;

    }
}

// takes current indice as input to check directos in both patterns, if right checks pattern lengths, if same after a delay calls nextDirecto & empties clickPattern
// if not than plays wrong sound, animates bg to indicate game end & calls restart
function check(indice){
    if(clickPattern[indice] === gamePattern[indice]) {
        if(clickPattern.length === gamePattern.length) {
            setTimeout(function() {
                clickPattern = [];
                nextDirecto();
            })
        }
    } else {
        playSound("wrong");

            $("body").addClass("end");
            $("h1").text("Game over, press any key to restart");

            gamePattern = [];

            setTimeout(function() {
                $("body").removeClass("end");
            }, 200)

        restart();
    }
}


// Accesory functions

// plays sound relevant to clicked/pressed directo
function playSound(directo) {
    var audio = new Audio("./sounds/" + directo + ".wav");
    audio.play();
}

//animates clicked/pressed directo
function animate(directo) {
    $("#" + directo).addClass("clicked");

    setTimeout(function() {
        $("#" + directo).removeClass("clicked");
    }, 200)
}

//displays current directo
function display(directo) {
    $("#canvas-" + directo).removeClass("hide");

    setTimeout(function() {
        $("#canvas-" + directo).addClass("hide");
    }, 1000)
}

// helps restart game easily
function restart() {
    level = 0;
    clickPattern = [];
    started = false;
}
