// Get elements of document
// let container = document.getElementById('container');
// let gameBackground = document.getElementById('game-background');
// let start = document.getElementById('start');

// gameBackground.append();
// gameBackground.append();
// gameBackground.append('<div id="enemy2"></div>');
// gameBackground.append('<div id="friend"></div>');

// Start the game

function start() { 
    // hide the start screen
    $("#start").hide();

    // show the game screen

    $('#game-background').append('<div id="player" class="anima-player"></div>');
    $('#game-background').append('<div id="enemy1" class="anima-enemy1"></div>');
    $('#game-background').append('<div id="enemy2"></div>');
    $('#game-background').append('<div id="friend" class="anima-friend"></div>');

    // global variable
    let game = {};
    let KEYS = {
        SPACE: 32,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
     };

     let velocity = 5;
     let positionY = parseInt(Math.random() * 334);

     let canShoot = true;

     let shootTimer = null;

     game.pressedKeys = [];

    //  check if key is pressed

    $(document).keydown(function(e) {
        game.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e) {
        game.pressedKeys[e.which] = false;
    });

    // game loop

    game.timer = setInterval(loop, 30); 

    function loop() {
        moveBackground();
        movePlayer(); 
        moveEnemy1();
        moveEnemy2();
        moveFriend();
    };//end loop

    function moveBackground() {
        // Move the background
        let left = parseInt($('#game-background').css('background-position'));
        $('#game-background').css('background-position', left - 1);

    };//end moveBackground


    function movePlayer() {
        // Move the player
        if (game.pressedKeys[KEYS.UP]) {
            let top = parseInt($('#player').css('top'));
            $('#player').css('top', top - 5);

            if (top <= 0) {
                $('#player').css('top', top + 5);
            }
        }

        if (game.pressedKeys[KEYS.DOWN]) {
            let top = parseInt($('#player').css('top'));
            $('#player').css('top', top + 10);

            if (top >= 434) {
                $('#player').css('top', top - 10);
            }
        }

        if (game.pressedKeys[KEYS.RIGHT]) {
            let left = parseInt($('#player').css('left'));
            $('#player').css('left', left + velocity);

            if (left >= $('#game-background').width() - $('#player').width()) {
                $('#player').css('left', left - velocity);
            }
        }

        if (game.pressedKeys[KEYS.LEFT]) {
            let left = parseInt($('#player').css('left'));
            $('#player').css('left', left - velocity);

            if (left <= 0) {
                $('#player').css('left', left + velocity);
            }
        }
        
        if (game.pressedKeys[KEYS.SPACE]) {
        //    call function to shoot
            shoot();
        }
    };//end movePlayer


    function moveEnemy1() {
        // Move the enemy1
        let positionX = parseInt($('#enemy1').css('left'));
        $('#enemy1').css('left', positionX - velocity);
        $('#enemy1').css('top', positionY);

        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 334);
            $('#enemy1').css('left', 694);
            $('#enemy1').css('top', positionY);
        };
    }; //end moveEnemy1


    function moveEnemy2() {
        // Move the enemy2
        let positionX = parseInt($('#enemy2').css('left'));
        $('#enemy2').css('left', positionX - 3);
      

        if (positionX <= 0) {
            $('#enemy2').css('left', 775);
        };
    } //end moveEnemy2


    function moveFriend() {
        // Move the friend
        let positionX = parseInt($('#friend').css('left'));
        $('#friend').css('left', positionX + 1);

        if (positionX >= 906) {
            $('#friend').css('left', 0);
        }
    } //end moveFriend

    function shoot() {
        console.log('shoot');
        // shoot
        if (canShoot) {

            canShoot = false;
            
            let bullet = $('<div id="bullet"></div>');
            $('#game-background').append(bullet);
            
            let heliTop = parseInt($('#player').css('top'));
            let heliLeft = parseInt($('#player').css('left'));
            
            let bulletTop = heliTop + $('#player').height() / 2; 
            let bulletLeft = heliLeft + $('#player').width() / 2;
            
            bullet.css('left', bulletLeft + 65);
            bullet.css('top',  bulletTop + 10);
            
            shootTimer = setInterval(executeShoot, 30);
            
        }
    } //end shoot
    
    function executeShoot() {
        let bulletLeft = parseInt($('#bullet').css('Left'));
        $('#bullet').css('left', bulletLeft + 15);

        if (bulletLeft >= 900) {
            clearInterval(shootTimer);
            shootTimer = null;
            $('#bullet').remove();
            canShoot = true;
        }
    } //end executeShoot

}; // end start()

