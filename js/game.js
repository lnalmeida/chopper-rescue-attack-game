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
    
    let score = 0;
    let life = 3;
    var gameOver=false;

    
    const displayScore = document.getElementById('score');

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
        colision();
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

    function colision() {
        let colision1 = ($("#player").collision($("#enemy1")));
        let colision2 = ($("#player").collision($("#enemy2")));
        let colision3 = ($("#bullet").collision($("#enemy1")));
        let colision4 = ($("#bullet").collision($("#enemy2")));
        let colision5 = ($("#player").collision($("#friend")));
        let colision6 = ($("#enemy2").collision($("#friend")));
       
        // jogador com o inimigo1
            if (colision1.length > 0) {
                life--;
                if (life == 0) {
                    endGame();
                }
                console.log('lifes', life);
                
                enemy1X = parseInt($("#enemy1").css("left"));
                enemy1Y = parseInt($("#enemy1").css("top"));
                explosion1(enemy1X,enemy1Y);
                
                positionY = parseInt(Math.random() * 334 );
                console.log(positionY);
                $("#enemy1").css("left",694);
                $("#enemy1").css("top", positionY);
            }

            // jogador com o inimigo2 
            if (colision2.length > 0) {
                life--;
                if (life == 0) {
                    setTimeout(endGame, 3000);
                }
            
                enemy2X = parseInt($("#enemy2").css("left"));
                enemy2Y = parseInt($("#enemy2").css("top"));
                explosion2(enemy2X,enemy2Y);

                $("#enemy2").remove();

                RespawnEnemy2();

            }

            // Disparo com o inimigo1
	        if (colision3.length > 0) {
                score+=100;
                displayScore.innerHTML = "SCORE: " + score;
            
                enemy1X = parseInt($("#enemy1").css("left"));
                enemy1Y = parseInt($("#enemy1").css("top"));

                explosion1(enemy1X,enemy1Y);
                $("#bullet").css("left",950);

                positionY = parseInt(Math.random() * 334);
                $("#enemy1").css("left",694);
                $("#enemy1").css("top",positionY);

            }

            // Disparo com o inimigo2
		
	        if (colision4.length > 0) {
                score+=150;
                displayScore.innerHTML = "Score: " + score;
            
                enemy2X = parseInt($("#enemy2").css("left"));
                enemy2Y = parseInt($("#enemy2").css("top"));
                $("#enemy2").remove();
            
                explosion2(enemy2X,enemy2Y);
                $("#bullet").css("left",950);

                RespawnEnemy2();

            }

            // jogador com o amigo

	        if (colision5.length > 0) {
                score+=200;
                displayScore.innerHTML = "Score: " + score;
                RespawnFriend();

                $("#friend").remove();
            }

            //Inimigo2 com o amigo
		
            if (colision6.length > 0) {
                life--;
                if (life == 0) {
                    setTimeout(endGame, 3000);
                }
            
                friendX = parseInt($("#friend").css("left"));
                friendY = parseInt($("#friend").css("top"));
                killFriend(friendX,friendY);
                $("#friend").remove();

                RespawnFriend();

                }
            
    } //Fim da função colision()

    //*********************** Explosões******************/
        
    // explosão do inimigo1
    function explosion1(enemy1X,enemy1Y) {
        $("#game-background").append("<div id='explosion1'></div");
        $("#explosion1").css("background-image", "url(assets/imgs/explosao.png)");
        var explosion1=$("#explosion1");
        explosion1.css("top", enemy1Y);
        explosion1.css("left", enemy1X);
        explosion1.animate({width:200, opacity:0}, "slow");
    
        let explosionTimer1=window.setInterval(removeExplosion1, 1000);
        
        function removeExplosion1() {
            explosion1.remove();
            window.clearInterval(explosionTimer1);
            explosionTimer=null;
        }            
    } // Fim da funçao explosao1()


    //explosao do inimigo2
	function explosion2(enemy2X,enemy2Y) {
        $("#game-background").append("<div id='explosion2'></div");
        $("#explosion2").css("background-image", "url(/assets/imgs/explosao.png)");
        var explosion2=$("#explosion2");
        explosion2.css("top", enemy2Y);
        explosion2.css("left", enemy2X);
        explosion2.animate({width:200, opacity:0}, "slow");

        let explosionTimer2=window.setInterval(removeExplosion2, 1000);

        function removeExplosion2() {
            explosion2.remove();
            window.clearInterval(explosionTimer2);
            explosionTimer2=null;
        }
    } // Fim da fun��o explosao2()

    //morte do amigo
	
    function killFriend(friendX,friendY) {
        $("#game-background").append("<div id='explosion3' class='killFriend'></div");
        $("#explosion3").css("top",friendY);
        $("#explosion3").css("left",friendX);
        var explosionTimer3=window.setInterval(resetExplosion3, 1000);
        function resetExplosion3() {
            $("#explosion3").remove();
            window.clearInterval(explosionTimer3);
            explosionTimer3=null;
        }
    
    } // Fim da funçao killFriend()

    //*********************** Fim da explosão******************/

    //Reposiciona Inimigo2	
	function RespawnEnemy2() {
	
        let colision4Timer=window.setInterval(respawn4, 5000);
            
            function respawn4() {
            window.clearInterval(colision4Timer);
            colision4Timer=null;
                
                if (gameOver==false) {
                
                $("#game-background").append("<div id=enemy2></div");
                
                }
                
            }	
        }	// Fim da fun��o RespawnEnemy2()

    //Reposiciona Amigo
	function RespawnFriend() {
	
        var friendTimer=window.setInterval(respawn6, 6000);
        
            function respawn6() {
            window.clearInterval(friendTimer);
            friendTimer=null;
            
            if (gameOver==false) {
            
            $("#game-background").append("<div id='friend' class='anima-friend'></div>");
            
            }
            
        }
        
    } // Fim da funçao RespawnFriend()


    function endGame() {
        if (gameOver==false) {
            setTimeout(function() {
                $("#game-background").append("<div id='game-over'></div");
                $("#game-over").css("background-image", "url(assets/imgs/game-over.png)");
                $("#game-over").css("top", "100px");
                $("#game-over").css("left", "100px");
                $("#game-over").css("width", "300px");
                $("#game-over").css("height", "300px");
                $("#game-over").css("opacity", "0");
                $("#game-over").animate({width:500, opacity:1}, "slow");
                setTimeout(function() {
                    gameOver = true;
                    restartGame();
                }, 2000);
            }, 1500);
        }
    }
    

}; // end start()

function restartGame() {
    setTimeout(function() {
        location.reload();
    } , 5000);
}

