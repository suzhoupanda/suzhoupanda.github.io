
	class Game{

		constructor(container){
			
			//Initialize Game :oop ID
			this.gameLoopID = 0;

			//Initialize Timer Variables
			this.timer = 0;
			this.timeRemaining = 60;
			this.clockTime = 0;

			//Initialize game states
			this.isPaused = false;
			this.isLost = false;
			this.isWon = false;

			//Initialize current background animation
			this.currrenbackgroundAnimation = null;

			//Create the container before the canvas
			this.container = container;

			//Initialize game sprites array
			this.sprites = [];

			//Instantiate the canvas before instantiating the player and other sprites
			//Sprites will require a reference to the canvas on which they are drawn
			this.createCanvasElement();
			this.context = this.canvasElement.getContext('2d');
			
			//Instantiate player
			this.createPlayer();

			//Configure level configuration

			var lastChar = window.location.href.substring(window.location.href.length-1);
			var currentLevel = parseInt(lastChar);


			if(isNaN(currentLevel) || currentLevel == null || currentLevel == undefined){
				currentLevel = 1;
			}
			
			console.log(currentLevel);
			this.levelConfiguration = LevelLoader.GetLevelConfiguration(parseInt(currentLevel));

			//Create sprite generators
			this.spriteGenerators = this.generateSpriteGenerators();

			//Spawn enemies
			var randNumEnemies = this.levelConfiguration.getRandomNumberOfEnemies();
			this.spriteGenerators.forEach((generator) =>{
				generator.spawnObjects(randNumEnemies);
			});

			//Configure the event handler that is called when the player shoots
			this.configurePlayerShootHandler();
	
			
			//Configure background music
			this.setupBGMusic();


			//Create a way for player to interact with game
			InputHelper.ConfigureCanvasKeyboardControls(this);
			
			//Create UI elements
			this.createPauseButton();
			this.createInstructionsButton();
			this.createMusicSettingsButton();
			this.createCrosshairSettingsButton();
			this.createTitleBanner();
			this.createHomeReturnButton();

			//Create the HUD
			this.createHUD();

		}

		setupBGMusic(){
			var bgMusicAudio = document.createElement("audio");
			this.bgMusicAudio = bgMusicAudio;
			this.bgMusicAudio.src = "polka_train.ogg";
			this.addToContainer(this.bgMusicAudio);
			this.loadBackgroundMusic();
		}

		generateSpriteGenerators(){
			var spriteGenerators = null;

			switch (this.levelConfiguration.enemyType) {
				case "alien":
					spriteGenerators = [new AlienGenerator(this.canvasElement)];
					break;
				case "wingman":
					spriteGenerators = [new WingmanGenerator(this.canvasElement)];
					break;
				case "evilsun":
					spriteGenerators = [new EvilSunGenerator(this.canvasElement)];
					break;
				case "evilcloud":
					spriteGenerators = [new EvilCloudGenerator(this.canvasElement)];
					break;

				case "all":
					spriteGenerators = [
					new EvilCloudGenerator(this.canvasElement),
					new EvilSunGenerator(this.canvasElement),
					new AlienGenerator(this.canvasElement),
					new WingmanGenerator(this.canvasElement)
					];
					break;
				default:
					spriteGenerators = [new AlienGenerator(this.canvasElement)];
					break;
			
			}

			return  spriteGenerators;
		}

		configurePlayerShootHandler(){
			//Get references to enemy generators for playerShoot handler
			var spriteGenerators = this.spriteGenerators;
			var player = this.player;

			this.shootAudio = new Audio();
			this.shootAudio.src = "assets/Sounds/laser2.ogg";
			this.addToContainer(this.shootAudio);

			var shootAudio = this.shootAudio;
			
			this.playerShootHandler = function(){

				shootAudio.play();
				spriteGenerators.forEach(function(spriteGenerator){

					spriteGenerator.checkPlayerContact(player);
				});
				
			};
		}

		createTitleBanner(){
			this.titleBannerText = "Current Level: " + this.levelConfiguration.levelNumber;
			this.titleElement = UIGenerator.CreateTitleBanner(this.titleBannerText);
			this.addToContainer(this.titleElement);
		}

		updateTitleBanner(){
				this.container.removeChild(this.titleElement);
				this.titleBannerText = "Current Level: " + sessionStorage.getItem("currentLevel");
				this.titleElement = UIGenerator.CreateTitleBanner(this.titleBannerText);
				this.addToContainer(this.titleElement);
		}

		createHomeReturnButton(){
			var currentGame = this;

			this.returnHomeButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.returnHomeButton,"50%");
			var buttonText = document.createTextNode("Return Home");
			this.returnHomeButton.appendChild(buttonText);
			
			var returnHomeButton = this.returnHomeButton;
			this.returnHomeButton.addEventListener("click", 
				function(){
					location.assign('https://suzhoupanda.github.io');			});

			this.addToContainer(this.returnHomeButton);

		}

		createInstructionsButton(){
			var currentGame = this;

			this.instructionsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.instructionsButton,"20%");
			var buttonText = document.createTextNode("Instructions");
			this.instructionsButton.appendChild(buttonText);
			
			var instructionsButton = this.instructionsButton;
			this.instructionsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateInstructionsPopup(
						"In order to move the targeting crosshair, use the up, down, left, and right arrows on your keypad.  When the crosshair is over an enemy, tap the spacebar to fire a missile at the enemy.",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.gif",
						function(){
							currentGame.isPaused = false;

						});
					currentGame.addToContainer(popup);
					currentGame.isPaused = true;
			});

			this.addToContainer(this.instructionsButton);

		}

		createCrosshairSettingsButton(){

			var currentGame = this;

			this.crosshairSettingsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.crosshairSettingsButton,"40%");
			
			var buttonText = document.createTextNode("Crosshair");
			this.crosshairSettingsButton.appendChild(buttonText);
			
			var crosshairSettingsButton = this.crosshairSettingsButton;
			var player = this.player;
			this.crosshairSettingsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateCrosshairSettingsPopup(
						"Crosshair Settings",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.gif",
						function(event){
							console.log("Processing event...");
							console.log(event);
							console.log(event.target.value);
							var newAcceleration = event.target.value/10
							player.adjustAcceleration(newAcceleration);
						},
						function(){
							currentGame.isPaused = false;

						});
					currentGame.addToContainer(popup);
					currentGame.isPaused = true;
			});

			this.addToContainer(this.crosshairSettingsButton);


		}

		createMusicSettingsButton(){
			var currentGame = this;

			this.musicSettingsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.musicSettingsButton,"30%");
			var buttonText = document.createTextNode("Music Settings");
			this.musicSettingsButton.appendChild(buttonText);
			
			var musicSettingsButton = this.musicSettingsButton;
			var bgMusicAudio = this.bgMusicAudio;
			this.musicSettingsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateMusicSettingsPopup(
						"Music Settings",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.gif",
						function(event){
							console.log("Processing event...");
							if(event.target.checked){
								if(bgMusicAudio.muted){
									bgMusicAudio.muted = false;
								} else {
									bgMusicAudio.muted = true;
								}
								
							} else {
								if(bgMusicAudio.muted){
									bgMusicAudio.muted = false;
								} else {
									bgMusicAudio.muted = true;
								}
							
							}
						},
						function(){
							currentGame.isPaused = false;

						});
					currentGame.addToContainer(popup);
					currentGame.isPaused = true;
			});

			this.addToContainer(this.musicSettingsButton);

		}

		createPauseButton(){
			var currentGame = this;

			this.pauseButton = document.createElement("a");
			this.configureMenuButton(this.pauseButton,"10%");


			var pauseText = document.createTextNode("Pause Game");
			var resumeText = document.createTextNode("Restart Game");
			this.pauseButton.appendChild(pauseText);
			var pauseButton = this.pauseButton;
			this.pauseButton.addEventListener("click", 
				function(){
				if(!this.isPaused){
					currentGame.pauseGame();
					this.isPaused = true;
					pauseButton.removeChild(pauseText);
					pauseButton.appendChild(resumeText);
				} else {
					currentGame.startGame();
					this.isPaused = false;
					pauseButton.removeChild(resumeText);
					pauseButton.appendChild(pauseText);
				}

			});

			this.addToContainer(this.pauseButton);

		}

		hasActiveBGAnimation(){
			return this.currentAnimation != null;
		}

		runBGAnimation(animation,callback = null){

			this.currentAnimation = animation;


			if(callback != null && typeof(callback) == "function"){
				callback();
			}
		}

		createPlayer(){
			var startPos = GAME_SETTINGS.getPlayerStartPosition();
			this.player = new Player(
				startPos[0],
				startPos[1],
				this.canvasElement);
		}


		addSprite(sprite){
			this.sprites.push(sprite);
		}

		loadBackgroundMusic(){

			var bgMusicAudio = this.bgMusicAudio;
			this.container.addEventListener("mousemove", function () {
    			bgMusicAudio.play();

    		});
		}


		createCanvasElement(){
			this.canvasElement = document.createElement("canvas");
			this.configureCanvasElement(this.canvasElement);
			this.addToContainer(this.canvasElement,0);
	
		}

		configureCanvasElement(canvasElement){
			UIGenerator.ConfigureCanvas(canvasElement);

		}

		configureMenuButton(button,topDistance){
			UIGenerator.ConfigureMenuButton(button,topDistance);
		
		}

		addToContainer(element,zIndex = 0){
			element.style.zIndex = zIndex;
			this.container.appendChild(element);
		}


		drawText(someText,x,y){
			this.context.strokeStyle = "white";
			this.context.font = '30 pt Times New Roman';
			this.context.strokeText(someText,x,y);

		}

		drawBackgroundImg(){
			var backgroundImg = new Image();
			backgroundImg.src = GAME_SETTINGS.getBackgroundImgPath();

			this.context.drawImage(
				backgroundImg,
				0,0,
				backgroundImg.naturalWidth,
				backgroundImg.naturalHeight,
				0,0,
				GAME_SETTINGS.screenWidth,
				GAME_SETTINGS.screenHeight
				);
		}

		/** HUD-related Helper Functions **/
		createHUD(){
		
			this.hud = new HUD(this.container,GAME_SETTINGS);
			this.hud.addHUD();

		}


		getTotalEnemies(){
			var totalEnemies = 0;

			this.spriteGenerators.forEach(function(spriteGenerator){
				totalEnemies += spriteGenerator.getTotalSprites();
				
			});

			return totalEnemies;
		}

		updateHUDSpriteCount(){
			var totalEnemies = this.getTotalEnemies();

			this.hud.updateEnemyCount(totalEnemies);
		}

		updateHUDKillCount(){
			var totalKills = 0;

			this.spriteGenerators.forEach(function(spriteGenerator){
				totalKills += spriteGenerator.getKillCount();
			});

			this.hud.updateKillCount(totalKills);
		}


		updateHUD(){
			this.updateHUDSpriteCount();
			this.updateHUDKillCount();

			
			this.hud.updateHUD();
		}

		/** Various 'hooks' for game loop **/

		updatePhysics(timeDiff){
			
			this.player.updatePhysics(timeDiff);
			
			this.spriteGenerators.forEach(function(spriteGenerator){
				
				spriteGenerator.updatePhysics(timeDiff);

			});
			

		}

		

		updateAnimations(timeDiff){

			//Draw the background image
			this.drawBackgroundImg();

			this.spriteGenerators.forEach(function(spriteGenerator){

				//Draw enemy sprites
				spriteGenerator.draw(timeDiff);

			});


			//Draw player last so that it's on top of aliens
			this.player.drawImage(this.context);

		}

		checkForGameWinOrLoss(){

			var currentGame = this;

			if(currentGame.timeRemaining == 0){
				currentGame.isLost = true;
				var msg = UIGenerator.CreateGameFinishedMessage("I'm Sorry! You Lost!",150,150,"/assets/Smilies/cry.gif");
				currentGame.addToContainer(msg);
			}

			if(currentGame.getTotalEnemies() == 0){
				currentGame.isWon = true;
				var msg = UIGenerator.CreateNextLevelMessage("Congratulations! You won!",
					150,150,
					"/assets/Medals/flat_medal1.png",function(){
						var nextLevel = currentGame.levelConfiguration.levelNumber + 1;
						
						if(window.location.href.substr(window.location.href.length-2,window.location.href.length-1) == "#"){
							window.location =window.location.href.substr(0,window.location.href-2) + nextLevel; 
						} else {
							window.location = window.location.href + "#" + nextLevel;

						}
						window.location.reload();


					});
				currentGame.addToContainer(msg);
			}
		}

	
		//Run the game loop
		runGame(){

			
			//Initialize timer-related variables
			var lastTime = Date.now();
			var currentTime = lastTime;
			var timeDiff = lastTime - currentTime;

			/** Store references to the current game,
			 * current context, canvas, etc. **/			
			var currentGame = this;
			var context = this.context;
			var canvas = this.canvasElement;
	

			this.gameLoopID = setInterval(function(){
				if(currentGame.isPaused || currentGame.isLost || currentGame.isWon){
					return;
				}

				//Calculate time difference
				timeDiff = lastTime - currentTime;
				currentTime = lastTime;
				currentGame.timer += timeDiff;


			
				//Clear the canvas before drawing other game objects
				context.clearRect(0,0,canvas.width,canvas.height);
				
				//Update physics, animation, HUD, etc.
				currentGame.updatePhysics(timeDiff);
				currentGame.updateAnimations(timeDiff);
				currentGame.updateHUD();


				
				currentGame.clockTime = Math.floor(currentGame.timer / 1000);
				currentGame.timeRemaining = currentGame.levelConfiguration.timeLimit - currentGame.clockTime;
				currentGame.drawText("Time Remaining: " + currentGame.timeRemaining,10,20);
				


				//Check if game win or loss conditions have been satisfied
				currentGame.checkForGameWinOrLoss();

				//Reset the last time
				lastTime = Date.now();

			}, GAME_SETTINGS.frameRate);

		}

		//Start Game
		startGame(){
			this.runGame();

		}

		//Restart Game
		restartGame(){
			this.runGame();

		}

		//Pause Game
		pauseGame(){
			clearInterval(this.gameLoopID);

		}

		//End Game
		endGame(){
			clearInterval(this.gameLoopID);

		}

	};
