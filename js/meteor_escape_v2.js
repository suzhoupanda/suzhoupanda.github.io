$(document).ready(function(){


//TODO: Turn off contact testing on game loss or game win
//TODO: Allow for user to save game data, maybe create a user profile
//TOOD: Create a high score
//TODO: create triggers to update the HUD, triggers for player contact events


var storeAnimationIntervalTimerID = function(key,timerID){

	
		localStorage.setItem(key,timerID);
	
}

var turnOffAllCurrentAnimations = function(){

		for(var key in localStorage){
			if(localStorage.hasOwnProperty(key)){
				if(key.includes("animation")){
					var timerID = localStorage.getItem(key);
					clearInterval(timerID);
				}
			}
		}
}

var explodeElement = function(element,isRemoved = false){

		if(!element.is("img")){
			console.log("Error: the element is NOT an image.  Cannot use explosion animation.")
			return;
		}

		if(element.attr("explosionAnimationID")){
			element.remove();
			return;
		}

		if(element.attr('textureAnimationID')){
			var textureAnimationID = element.attr('textureAnimationID');
			clearInterval(textureAnimationID);
		}

		var basePath = "./img/explosion/";

		var explosionTextures = [
			"regularExplosion01",
			"regularExplosion02",
			"regularExplosion03",
			"regularExplosion04",
			"regularExplosion05",
			"regularExplosion06",
			"regularExplosion07",
			"regularExplosion08",

		]

		var imageExtension = ".png";

		var i = 0;

		var explosionAnimationID = setInterval(function(){

	

			if(i < explosionTextures.length-1){

				var imagePath = constructImagePath(basePath,explosionTextures[i],imageExtension);
				element.attr("src",imagePath);
				i++;

			} else {
				var timerID = element.attr("explosionAnimationID");
				clearInterval(timerID);
				if(isRemoved){
					element.remove();
				}
			}
		},100);


		storeAnimationIntervalTimerID(explosionAnimationID);


		element.attr("animation-explosionAnimationID",explosionAnimationID);


	}
	

	var createCoin = function(container,coinType,initialTop, initialLeft, width, height,animationDuration,coinID){


	console.log("Creating image element....");

		var element = $("<img>");

		container.append(element);


		element.css("position","absolute");

		var startingImagePath = "img/items/bronze_1.png";

		switch(coinType){
			case "gold":
				startingImagePath = "img/items/gold_1.png";
				break;
			case "silver":
				startingImagePath = "img/items/silver_1.png";
				break;
			case "bronze":
				startingImagePath = "img/items/bronze_1.png";
				break;
		}


		element.attr("src",startingImagePath);
		element.attr("alt","coin-"+coinType);


		var styles = {
			"top": initialTop + "px",
			"left": initialLeft + "px"
		}

		if(width != null){
			styles["width"] = width + "px";
		}

		if(height != null){
			styles["height"] = height + "px";
		}


		element.css(styles);

	
		element.attr(styles);

		element.addClass("coin-"+coinType);
		element.attr("id",coinID);


		var basePath = "img/items/";

		var textures = [];

		switch(coinType){
			case "gold":
				textures.push("gold_1.png","gold_2.png","gold_3.png","gold_3.png","gold_2.png","gold_1.png");
				break;
			case "silver":
				textures.push("silver_1.png","silver_2.png","silver_3.png","silver_3.png","silver_2.png","silver_1.png");
				break;
			case "bronze":
				textures.push("bronze_1.png","bronze_2.png","bronze_3.png","bronze_3.png","bronze_2.png","bronze_1.png");
				break;
		}


		var i = 0;

		var interval = animationDuration/textures.length;

		var coinAnimationID = setInterval(function(){

			if(i > textures.length - 1){
				i = 0;
			}

			var imagePath = basePath + textures[i];
			element.attr("src",imagePath);

			element.css("top","+=5.0");


			i ++;

		},interval);

		storeAnimationIntervalTimerID("animation-coinAnimationID",coinAnimationID);

	}


	

	var createMeteor = function(container, meteorType, initialTop, initialLeft, width, height, animationDuration, meteorID){


		if(meteorType > 4 || meteorType < 1){
			console.log("Error: meteory type must be between 0 and 4")
			return;
		}

		console.log("Creating meteor element....");

		var element = $("<img>");



		container.append(element);

		console.log("Setting image attributes....");

		element.css("position","absolute");

		var relativePath = "meteor" + meteorType + ".png";

		element.attr("src","img/meteors/" + relativePath);
		element.attr("alt","Meteor");



		var styles = {
			"top": initialTop + "px",
			"left": initialLeft + "px"
		}

		if(width != null){
			styles["width"] = width + "px";
		}

		if(height != null){
			styles["height"] = height + "px";
		}


		element.css(styles);

		element.attr(styles);
		element.addClass("meteor");
		element.attr("id",meteorID);




		var meteorAnimationID = setInterval(function(){


			element.css("top","+="+animationDuration);


		

		},0.01);


		storeAnimationIntervalTimerID("animation-meteorAnimationID",meteorAnimationID);

	}


	var createFlyMan = function(container, initialTop,initialLeft, width, height, animationDuration, flymanID){

		console.log("Creating image element....");

		var element = $("<img>");

		container.append(element);


		element.css("position","absolute");
		element.attr("src","img/characters/wingMan1.png");
		element.attr("alt","Flyman");

		element.attr("data-health",10);
		element.attr("data-gold-coins",0);
		element.attr("data-silver-coins",0);
		element.attr("data-bronze-coins",0);
		element.attr("data-isInContact",false);

		element.on("player:player-dead", function(){

			explodeElement($(this));
		});

		var styles = {
			"top": initialTop + "px",
			"left": initialLeft + "px"
		}

		if(width != null){
			styles["width"] = width + "px";
		}

		if(height != null){
			styles["height"] = height + "px";
		}

		element.css(styles);

		element.attr(styles);

		element.addClass("flyman");
		element.attr("id",flymanID);


		console.log("The image id is: " + element.attr("id") + ";");


		var basePath = "img/characters/";

		var textures = [
			"wingMan1.png",
			"wingMan2.png",
			"wingMan3.png",
			"wingMan4.png",
			"wingMan5.png",
			"wingMan4.png",
			"wingMan3.png",
			"wingMan2.png",
			"wingMan1.png",

		];

		$.each(textures,function(index,relativePath){
			console.log("Texture " + index + ": " + relativePath);
		});

		var i = 0;

		var interval = animationDuration/textures.length;

		var textureAnimationID = setInterval(function(){

			if(i > textures.length - 1){
				i = 0;
			}

			var imagePath = basePath + textures[i];
			element.attr("src",imagePath);

			i ++;

		},interval);

		element.attr("textureAnimationID",textureAnimationID);

		storeAnimationIntervalTimerID("animation-textureAnimationID",textureAnimationID);

		
	};

	
		

	var registerGameTitleEventHandlers = function(){
		$("#game-title").on('game-title:game-over', function(){
			$(this).text("Game Over!");
		});

		$("#game-title").on('game-title:game-win',function(){
			$(this).text("Congratulations! You win!");
		});
	};


	

	var updateHUD = function(health = null,goldCount = null,silverCount = null,bronzeCount = null){

		if(health != null){
			$("#health-count").text(health.toString());
		}

		if(goldCount != null){
			$("#gold-count").text(goldCount.toString());
		}

		if(silverCount != null){
			$("#silver-count").text(silverCount.toString());
		}

		if(bronzeCount != null){
			$("#bronze-count").text(bronzeCount.toString());
		}

	};


	var showPlayerPosition = function(){

		var flyman = $("#main-flyman");
		var fTop = flyman.offset().top;
		var fLeft = flyman.offset().left;
		var fBottom = flyman.offset().top + flyman.outerHeight();
		var fRight = flyman.offset().left + flyman.outerWidth();

		console.log("Player Top: " + fTop);
		console.log("Player Left: " + fLeft);
		console.log("Player Right: " + fRight);
		console.log("Player Bottom: " + fBottom);


	}

	

	var isTooFarTop = function(targetArea){
		var flyman = $("#main-flyman");
		var fTop = flyman.offset().top;
		var fLeft = flyman.offset().left;
		var fBottom = flyman.offset().top + flyman.outerHeight();
		var fRight = flyman.offset().left + flyman.outerWidth();

		var movementOffset = 50;

		var maxTop = targetArea.offset().top + movementOffset;

		return fTop < maxTop;
		
	}

	var isTooFarRight = function(targetArea){
		var flyman = $("#main-flyman");
		var fTop = flyman.offset().top;
		var fLeft = flyman.offset().left;
		var fBottom = flyman.offset().top + flyman.outerHeight();
		var fRight = flyman.offset().left + flyman.outerWidth();

		var movementOffset = 50;

		var maxRight = targetArea.offset().left + targetArea.outerWidth() - movementOffset;

	
		return fRight > maxRight;
	}

	var isTooFarLeft = function(targetArea){
		var flyman = $("#main-flyman");
		var fTop = flyman.offset().top;
		var fLeft = flyman.offset().left;
		var fBottom = flyman.offset().top + flyman.outerHeight();
		var fRight = flyman.offset().left + flyman.outerWidth();

		var movementOffset = 50;

		var maxLeft = targetArea.offset().left + movementOffset;

		return fLeft < maxLeft;
	}

	var isTooFarBottom = function(targetArea){
		var flyman = $("#main-flyman");
		var fTop = flyman.offset().top;
		var fLeft = flyman.offset().left;
		var fBottom = flyman.offset().top + flyman.outerHeight();
		var fRight = flyman.offset().left + flyman.outerWidth();

		var movementOffset = 50;

		var maxBottom = targetArea.offset().top + targetArea.outerHeight() - movementOffset;

		return fBottom > maxBottom;
	}


	var disableControlButtons = function(){

		var upButton = $("#up");
		var downButton = $("#down");
		var leftButton = $("#left");
		var rightButton = $("#right");

		upButton.off("click");

		downButton.off("click");

		leftButton.off("click");

		rightButton.off("click");
	}

	var isButtonDisabled = function(controlButton){

		var isDisabled = controlButton.attr('data-isDisabled');

		if(isDisabled != undefined && isDisabled == true){
			return true;
		} else {
			return false;
		}

	};

	var registerUserClickHandlers = function(targetArea){

		
		var flyman = $("#main-flyman");

		var upButton = $("#up");
		var downButton = $("#down");
		var rightButton = $("#right");
		var leftButton = $("#left");


		upButton.on('click', function(){

			

			if(!isTooFarTop(targetArea)){
				flyman.css("top","-=50");
			} 
		});

		downButton.on('click', function(){

		

			if(!isTooFarBottom(targetArea)){
				flyman.css("top","+=50");
			}

		});


		rightButton.on('click', function(){


			if(!isTooFarRight(targetArea)){
				flyman.css("left","+=50");
			}

		});

		leftButton.on('click', function(){


			if(!isTooFarLeft(targetArea)){
				flyman.css("left","-=50")
			}

		});
	}


	var getRandomBackgroundImagePath = function(){

		var basePath = "./img/backgrounds/";

		var backgroundTextures = [
			"colored_castle.png",
			"colored_desert.png",
			"colored_forest.png",
			"colored_talltrees.png",
			"uncolored_castle.png",
			"uncolored_desert.png",
			"uncolored_forest.png",
			"uncolored_hills.png",
			"uncolored_peaks.png",
			"uncolored_piramids.png",
			"uncolored_plain.png",
			"uncolored_talltrees.png"
		];

		var randomIdx = Math.floor(Math.random()*backgroundTextures.length)
		var randomTexture = backgroundTextures[randomIdx];

		return basePath + randomTexture;
	}

	var setupBackground = function(targetArea){

		var randomTexturePath = getRandomBackgroundImagePath();

		var backgroundProperties = {
			"background-image":"url(" + randomTexturePath + ")",
			"background-repeat":"no-repeat",
			"background-size":"cover"
		}

		targetArea.css(backgroundProperties);

	};

	var setupTargetAreaBorder = function(borderStyle,borderWidth,borderColor){

		var styles = {
			"border-color":borderColor,
			"border-style":borderStyle,
			"border-width":borderWidth
		}

		$("#target-area").css(styles);

	}

	var setupBackgroundWithChildImage = function(targetArea){

		var randomTexturePath = getRandomBackgroundImagePath();

		var backgroundImage = $("<img>");
		backgroundImage.attr("src",randomTexturePath);

		targetArea.append(backgroundImage);

		var styles = {
			"width":"100%",
			"height":"auto",
			"z-index":"-1"
		}

		backgroundImage.css(styles);


	}


 	var registerAudioClickHandler = function(targetArea){
 		//toggle-audio-controls 

 		$("#toggle-audio-controls").on("click",function(){

 			var audio_controls = $(this);

 			audio_controls = audio_controls.parent().detach();

 			var show_audio_button = $("<button>");
 			show_audio_button.attr("id","show_audio_button");

 			$("body").append(show_audio_button);

 			var styles = {
 				"position":"fixed",
 				"top":"0px",
 				"right":"0px",
 				"width":"15em",
 				"height":"2em",
 				"font-size": "10px"
 			}

 			show_audio_button.css(styles);
 			show_audio_button.text("Show Audio Controls");

 			show_audio_button.on("click",function(){
 				$(this).hide();

 				$("body").append(audio_controls);
 				audio_controls.show();
 			});

 		})
	}


	var registerHUDClickHandler = function(){

		$("#toggle-hud").on("click",function(e){
		
		var HUD = $("#hud-display");

		HUD.hide();

		var showHUDButton = $("<button>");

		$("body").append(showHUDButton);

		showHUDButton.text("Show HUD");
		showHUDButton.attr("id","show-hud-button");

		var styles = {
			"position":"fixed",
			"bottom":"0px",
			"right":"0px",
			"width":"20%",
			"height":"3em",
			"font-family": "'Concert One', cursive"
		}

		showHUDButton.css(styles);

		showHUDButton.on("click",function(e){
			HUD.show();
			$(this).hide();
		});

	});

	}


	
	var showMainTitle = function(targetArea, titleText, titleDisplayTime){

		var main_title = $("<h1></h1>");

		targetArea.append(main_title);

		main_title.attr("id","#main-title");

		main_title.text(titleText);

		var styles = {
			"display":"inline",
			"position":"relative",
			"text-align":"center",
			"margin":"auto 0",
			"z-index":"20"
		}

		main_title.css(styles);

		var timer_id = setTimeout(function(){

			main_title.remove();

		},titleDisplayTime);

	}

	var createCloud = function(targetArea,cloudType){

		var basePath = "img/clouds/"
		var textureName = "cloud";
		var fullPath = basePath + textureName;

		if(cloudType <= 0 && cloudType > 0){
			fullPath += cloudType.toString();

		} else {
			fullPath += "1";
		}

		var extension = ".png"

		fullPath += extension;

		var cloudImage = $("<img>");

		targetArea.append(cloudImage);

		cloudImage.attr("src",fullPath);
		cloudImage.addClass("cloud");

		var left = Math.floor(Math.random()*500) + 1;
		var top = Math.floor(Math.random()*300) + 1;

		var styles = {
			"position":"absolute",
			"width":"100px",
			"height":"auto",
			"top": top+"px",
			"left": left+"px",
			"z-index":"0"
		}

		cloudImage.css(styles);

	};

	var createRandomClouds = function(targetArea,numberOfClouds){

		for(var i = 0; i < numberOfClouds; i++){

			var cloudType = Math.floor(Math.random()*9) + 1;

			createCloud(targetArea,cloudType);
		}
	}

	var constructImagePath = function(basePath,imageName,imageExtension){

		return basePath + imageName + imageExtension;
	}

	




	var isOverlapping = function(div1,div2){

		var w1 = div1.outerWidth()
		var h1 = div1.outerHeight();
		var offset1 = div1.offset();
		var left1 = offset1.left;
		var top1 = offset1.top;
		var bottom1 = top1 + h1;
		var right1 = left1 + w1;

		var w2 = div2.outerWidth()
		var h2 = div2.outerHeight();
		var offset2 = div2.offset();
		var left2 = offset2.left;
		var top2 = offset2.top;
		var bottom2 = top2 + h2;
		var right2 = left2 + w2;

		var hasVerticalContact = !((bottom1 < top2) || (bottom2 < top1))
		var hasHorizontalContact = !((left1 > right2) || (left2 > right1))

		return hasVerticalContact && hasHorizontalContact;

	};
	var showBoundingInfo = function(div){

			var mHeight = div.height();
			var mWidth = div.width();
			var mPosition = div.position();
			var mLeft = mPosition.left;
			var mTop = mPosition.top;


			console.log("Div width: " + mWidth + ", Div height: " + mHeight)
			console.log("DIv top: " + mTop + ", Div left: " + mLeft);


	};




	var testForPlayerContactWithOtherClass = function(container,playerID,otherClass,playerContactBegin,otherContactBegin,playerContactEnd,otherContactEnd){

		var player = $("#"+playerID);

		container.children('.'+otherClass).each(function(index){

			var otherObject = $(this);

			if(isOverlapping(player,otherObject)){
				// console.log("The " + playerID + " and " + otherClass + " are overlapping");

				if(playerContactBegin != null){
					playerContactBegin(player);
				}

				if(otherContactBegin != null){
					otherContactBegin(otherObject);
				}
				
			} else {
				// console.log("The " + playerID + " and " + otherClass + " are NOT overlapping");
				if(playerContactEnd != null){
					playerContactEnd(player);
				}

				if(otherContactEnd != null){
					otherContactEnd(otherObject);
				}
				
			}
		});
	}

	var adjustPlayerHealth = function(player,deltaHealth){

		if(player.attr("data-health") != undefined){

				var originalHealth = player.attr("data-health");
				var updatedHealth = parseInt(originalHealth) + deltaHealth;

				if(updatedHealth > 0){
					updateHUD(updatedHealth);
					player.attr("data-health", updatedHealth);
				} else {
					player.attr("data-health", 0);
					updateHUD(0);
					$("#game-title").trigger("game-title:game-over");
					player.trigger("player:player-dead");
					turnOffAllCurrentAnimations();
					disableControlButtons();
					showGameSummary(false);

				}

		
				console.log("The new player health is " + player.attr("data-health"));

		} else {
			console.log("The player does not have an attribute 'health' ");
		}
	
	};

	var adjustCoinCount = function(player, coinType, deltaCoinAmount){
		
		switch(coinType){
			case "gold":
				if(player.attr("data-gold-coins") != undefined){
					var originalGoldCount = player.attr("data-gold-coins");
					var updatedGoldCount = parseInt(originalGoldCount) + deltaCoinAmount;
					player.attr("data-gold-coins",updatedGoldCount);
					updateHUD(null,updatedGoldCount,null,null);
					if(updatedGoldCount >= 10){
						$("#game-title").trigger("game-title:game-win");
						turnOffAllCurrentAnimations();
						disableControlButtons();
						showGameSummary(true);

					}
					console.log("The player's gold coin coun is now: " + updatedGoldCount);
				} else {
					console.log("Player has no attribute 'gold-coins' ");
				}
				break;
			case "silver":
				if(player.attr("data-silver-coins") != undefined){
					var originalSilverCount = player.attr("data-silver-coins");
					var updatedSilverCount = parseInt(originalSilverCount) + deltaCoinAmount;
					player.attr("data-silver-coins",updatedSilverCount);
					updateHUD(null,null,updatedSilverCount,null);
					if(updatedGoldCount >= 20){
						$("#game-title").trigger("game-title:game-win");
						turnOffAllCurrentAnimations();
						disableControlButtons();
						showGameSummary(true);


					}
					console.log("The player's silver coin coun is now: " + updatedSilverCount);

				} else {
					console.log("Player has no attribute 'silver-coins' ");
				}
				break; 
			case "bronze":
				if(player.attr("data-bronze-coins") != undefined){
					var originalBronzeCount = player.attr("data-bronze-coins");
					var updatedBronzeCount = parseInt(originalBronzeCount) + deltaCoinAmount;
					player.attr("data-bronze-coins",updatedBronzeCount);
					updateHUD(null,null,null,updatedBronzeCount);
					if(updatedGoldCount >= 30){
						$("#game-title").trigger("game-title:game-win");
						turnOffAllCurrentAnimations();
						disableControlButtons();
						showGameSummary(true);


					}
					console.log("The player's bronze coin coun is now: " + updatedBronzeCount);

				} else {
					console.log("Player has no attribute 'bronze-coins' ");
				}
				break;
		}
	}


	var testForPlayerCollisions = function(targetArea){


		var targetArea = $("#target-area");

		testForPlayerContactWithOtherClass(
			targetArea,
			"main-flyman",
			"meteor",
			function(player){


				var playerDidBeginContact = sessionStorage.getItem('playerDidBeginContact');


				if(playerDidBeginContact && playerDidBeginContact == true){
					console.log("Cannot continue processing contact, player is in contact already");
					return;
				
				} 

				console.log("Starting to process player contact...");




						adjustPlayerHealth(player,-1);

					var damageAnimationID = setInterval(function(){
						var currentOpacity = player.css('opacity');

						if(currentOpacity == "1"){
							player.css('opacity',"0.5");
						} else {
							player.css('opacity',"1");
						}

					},100);


					setTimeout(function(){
						console.log("Turning off player contact");
						clearInterval(damageAnimationID);
						player.css('opacity',"1");
						sessionStorage.setItem("playerDidBeginContact",false);
						player.attr("isInContact",false);
					},1500);
			
			},
			function(meteor){
			},function(player){

			},
			function(meteor){

			});


		testForPlayerContactWithOtherClass(targetArea,
			"main-flyman",
			"coin-gold",
			function(player){
				adjustCoinCount(player,"gold",1);
			},function(coin){
				coin.remove();
			});

		testForPlayerContactWithOtherClass(targetArea,
			"main-flyman",
			"coin-silver",
			function(player){
				adjustCoinCount(player,"silver",1);
			},function(coin){
				coin.remove();
			});

		testForPlayerContactWithOtherClass(targetArea,
			"main-flyman",
			"coin-bronze",
			function(player){
				adjustCoinCount(player,"bronze",1);
			},function(coin){
				coin.remove();
			});

	};




	var getRandomPointAboveTargetArea = function(targetArea){

			var areaOffset = targetArea.offset();
			var areaTop = areaOffset.top;
			var areaLeft = areaOffset.left;
			var areaWidth = targetArea.width();
			var areaHeight = targetArea.height();

			var randomLeft = Math.floor(Math.random()*areaWidth) + areaLeft;
			var randomTop = areaTop - 100;

			return [randomLeft,randomTop];
	}

	var createMeteorShower = function(container){

		var meteorNumber = 0;

		var meteorCreatorID = setInterval(function(){

			var randomMeteoryType = Math.floor(Math.random()*3)+1
			var randomMeteorWidth = (Math.floor(Math.random()*100) + 30)
			var randomMeteorHeight = randomMeteorWidth;

			var pointAboveTargetArea = getRandomPointAboveTargetArea(container);

			var randomLeft = pointAboveTargetArea[0];
			var randomTop = pointAboveTargetArea[1];

			var randomSpeed =  1 + Math.floor(Math.random()*2);


			createMeteor(container, randomMeteoryType, randomTop, randomLeft, randomMeteorWidth, randomMeteorHeight, randomSpeed, "meteor" + meteorNumber);
			meteorNumber++;

		},1000);

		storeAnimationIntervalTimerID("animation-meteorCreatorID",meteorCreatorID);
		
		

	

	}


	var createRandomFrequencyMeteorShower = function(targetArea, frequency){

		var meteorNumber = 0;

		var meteorCreatorID = setInterval(function(){

			if(meteorNumber == 5){
				clearInterval(meteorCreatorID);
				var randomRequency = 500 + Math.random()*3000
				createRandomFrequencyMeteorShower(randomRequency);
			}

			var randomMeteoryType = Math.floor(Math.random()*3)+1
			var randomMeteorWidth = (Math.floor(Math.random()*100) + 30)
			var randomMeteorHeight = randomMeteorWidth;

			var pointAboveTargetArea = getRandomPointAboveTargetArea(targetArea);

			var randomLeft = pointAboveTargetArea[0];
			var randomTop = pointAboveTargetArea[1];


			var randomSpeed =  1 + Math.floor(Math.random()*2);


			createMeteor(targetArea, randomMeteoryType, randomTop, randomLeft, randomMeteorWidth, randomMeteorHeight, randomSpeed, "meteor" + meteorNumber);
			meteorNumber++;

		},frequency);


		storeAnimationIntervalTimerID("animation-meteorCreatorID",meteorCreatorID);


	}

	var getTotalNumberOfMeteors = function(targetArea){

		return targetArea.children('.meteor').length;

	}


	var getTotalNumberOfCoins = function(targetArea){
		return targetArea.children('.coin-gold').length + targetArea.children('.coin-silver').length + targetArea.children('.coin-bronze').length;
	}

	var clearExcessForObjectClass = function(targetArea,className){

		var top = targetArea.offset().top;
		var height = targetArea.height();
		var maxAllowableFallDistance = top+height - 200;

		var maxFallPosition = top + maxAllowableFallDistance;


		targetArea.children("."+className).each(function(index){

			var objectTop = $(this).offset().top;

			if(objectTop > maxFallPosition){
				$(this).remove();
			}
		});


	}

	


	var createCoinShower = function(container){

		var i = 0;

		var coinDict = {
			"numberGold": 0,
			"numberSilver": 0,
			"numberBronze":0
		}

		var coinShowerID = setInterval(function(){

			var coinTypes = ["gold","silver","bronze"];

			var randomIndex = Math.floor((Math.random()*2));

			var randomCoinType = coinTypes[randomIndex];
			var coinID;

			switch(randomIndex){
				case 0:
					coinDict["numberGold"] += 1;
					coinID = randomCoinType + coinDict["numberGold"];
					break;
				case 1:
					coinDict["numberSilver"] += 1;
					coinID = randomCoinType + coinDict["numberSilver"];
					break;
				case 2:
					coinDict["numberBronze"] += 1;
					coinID = randomCoinType + coinDict["numberBronze"];
					break;
			}


			var pointAboveTargetArea = getRandomPointAboveTargetArea(container);

			var randomLeft = pointAboveTargetArea[0];
			var randomTop = pointAboveTargetArea[1];


			var randomWidth = Math.floor(Math.random()*100) + 50;
			var randomHeight = randomWidth;

			createCoin(container,randomCoinType,randomTop, randomLeft, randomWidth, randomHeight,600,coinID.toString());

			i++;

		},1000);

		storeAnimationIntervalTimerID("animation-CoinShowerID",coinShowerID);
	

	}


	var disableMeteorShower = function(){

		var meteorShowerID = sessionStorage.getItem("meteorShowerID");
		clearInterval(meteorShowerID);

	}

	var disableCoinShower = function(){

		var coinShowerID = sessionStorage.getItem("coinShowerID");
		clearInterval(coinShowerID);

	}

	var checkGameOver = function(){

		setInterval(function(){
			if(playerHasWon){
				disableCoinShower();
				disableMeteorShower();
			}

			if(playerHasLost){
				disableCoinShower();
				disableMeteorShower();

			}

		},500);
	}

	var clearExcessObjects = function(targetArea){
			
		return setInterval(function(){
			var totalCoins = getTotalNumberOfCoins(targetArea);
			var totalMeteors = getTotalNumberOfMeteors(targetArea);

			//console.log("Total coins: " + totalCoins);
			//console.log("Total meteors: " + totalMeteors);

			clearExcessForObjectClass(targetArea,"meteor");
			clearExcessForObjectClass(targetArea,"coin-gold");
			clearExcessForObjectClass(targetArea,"coin-silver");
			clearExcessForObjectClass(targetArea,"coin-bronze");


		}, 500);
	}


	var showGameSummary = function(hasWon){

		var gameSummary = $("<div></div>");

		var title = $("<h1></h1>");

		title.text(hasWon ? "Congratulations! You won!" : "Sorry, better luck next time!");

		gameSummary.append(title);

		var restartButton = $("<button>");

		restartButton.text("Play again?");

		restartButton.on("click",function(){
			location.reload();
		});


		gameSummary.append(restartButton);

		var styles = {
			"position":"fixed",
			"top":"10em",
			"left":"10em",
			"padding":"3em",
			"background-color": "#baeff5",
			"border-color": "black",
			"border-style":"ridge",
			"border-width": "10px",
			"font-family": "'Righteous', cursive",
			"text-align":"center"
		}

		gameSummary.css(styles);

		$("body").append(gameSummary);
	}

	var registerResizeHandlers = function(){

		$(window).on("resize",function(){

			//check whether resize is significant, use breakpoints for boolean check

			//trigger resize of targetArea

			//trigger resize and resposition of player

			//change spawning area for coins and meteors

			//modify createFlyman so that initial spawning point is a function of window

			//register callbacks for custom resize events triggered for targetArea, player, coins, and meteors

				//modify createMeteorShower, createCoinShower so that random spawn points are function of window size and so that random size of
					//meteors and coins is adjusted as well



		});

	}

	var registerTargetAreaEventHandlers = function(targetArea){

		targetArea.on("target-area:turn-off-animations",function(){
			turnOffAllCurrentAnimations();
		});
	}


	
	var getInitialPlayerSpawnPoint = function(){

		var wHeight = window.outerHeight;
		var wWidth = window.outerWidth;

		var initialLeft = Math.floor(wWidth/2.0);
		var initialTop = Math.floor(wHeight/3.0);

		return [initialLeft,initialTop];
	}


	var spawnPlayer = function(targetArea){

		var initialSP = getInitialPlayerSpawnPoint();

		createFlyMan(targetArea, initialSP[1],initialSP[0], 100, 80, 500, "main-flyman");
	}

	var storeGameData = function(){
		//use localStorage to store player's data after win
	};

	var runGame = function(targetArea){

	

		showMainTitle(targetArea,"Meteor Escape",3000);

		//TODO: initial cloud spawn points should be window dependent
		createRandomClouds(targetArea,10);

		spawnPlayer(targetArea);

		//TODO: initial coin spawn points should be window dependent
		createCoinShower(targetArea);

		//TODO: initial meteor spawn points should be window dependent
		createMeteorShower(targetArea);


		registerHUDClickHandler(targetArea);

		registerAudioClickHandler();

		registerUserClickHandlers(targetArea);

		registerGameTitleEventHandlers();

		setInterval(testForPlayerCollisions,1000);

		var clearFunctionID = clearExcessObjects(targetArea);

		

	}



var startGame = function(){
	var targetArea = $("#target-area");

	setupBackgroundWithChildImage(targetArea);

	$("#game-ready-button").on("click",function(){



		$(this).parent().hide();

		runGame(targetArea);
	});
}

	

	startGame();

	


});