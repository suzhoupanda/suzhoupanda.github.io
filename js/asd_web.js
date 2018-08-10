
//TODO: optimize by pre-loading images, define function on for the entire document scope
	//Bugfix: character texture animations not loading
	
//TODO: define class for character so that animations for the character can run and stopped more conveniently 

//TODO: use a progress bar for HUD to represent number killed, health, etc.

//TODO: make sure to clear the storage of all existing IDs, etc.

//TODO: character moves in upward movement until it encounters border then moves in opposite direction; likewise for horizontal movement

//TODO: if character is behind cloud, then it cannot be fired upon

//TODO: vary character widths 

//TODO: consider preloading images into an array or jQuery image object and then looping through them by changing the z-index, opacity, etc.

/** 



	//Ineffective: character moves instantaneously, character is not rendered during each interval, computations are completed so quickly that 
	//character is moved to destination in a single instant

	var moveCharacterToPointSlow = function(character,toLeft,toTop,numberIntervals,duration){

		var deltaX = (character.offset().left - toLeft)/numberIntervals;
		var deltaY = -(character.offset().top - toTop)/numberIntervals;

		var movementTime = duration;


		var moveCharacterByIncrement = function(i){

			if(i >= numberIntervals){
				return;
			} 

		var characterMovementID = setTimeout(function(){

				var movementInfo = {
					"top": deltaY + "px",
					"left": deltaX + "px"
				}

				character.css(movementInfo);

				i++;

				moveCharacterByIncrement(i);

				},movementTime);

		localStorage.setItem(character.attr("id")+"-movementID",characterMovementID);


		}	


		moveCharacterByIncrement(0);

	}

	//Ineffective: character moves instantaneously, character is not rendered during each interval, computations are completed so quickly that 
	//character is moved to destination in a single instant
	var moveCharacterToPoint = function(character,toLeft,toTop,numberIntervals,duration){

		var i = 0;

		var deltaX = (character.offset().left - toLeft)/numberIntervals;
		var deltaY = -(character.offset().top - toTop)/numberIntervals;

		var movementID = setInterval(function(){

			if(i < numberIntervals){

				var movementInfo = {
					"top": deltaY + "px",
					"left": deltaX + "px"
				}

				character.css(movementInfo);

			} else {
				clearInterval(movementID);
			}

		},duration);
	}



var initializeHUD = function(maxSpikeBall,maxEvilSun,maxEvilCloud,maxFlyMan){

		$("#hud").attr("data-number-killed-spikeball",0);
		$("#hud").attr("data-number-killed-evilsun",0);
		$("#hud").attr("data-number-killed-evilcloud",0);
		$("#hud").attr("data-number-killed-flyman",0);

		$("#hud").attr("data-max-spikeball",maxSpikeBall);
		$("#hud").attr("data-max-evilsun",maxEvilSun);
		$("#hud").attr("data-max-evilcloud",maxEvilCloud);
		$("#hud").attr("data-max-flyman",maxFlyMan);

		$("#hud").on("hud:spikeball-died",function(){
			updateHUD("spikeball",1);
		});

		$("#hud").on("hud:evilcloud-died",function(){
			updateHUD("evilcloud",1);
		});

		$("#hud").on("hud:evilsun-died",function(){
			updateHUD("evilsun",1);
		});

		$("#hud").on("hud:flyman-died",function(){
			updateHUD("flyman",1);
		});

	}


	var updateHUD = function(characterClass,numberKilled){

		var currentKillCount = $("#hud").attr("data-number-killed-" + characterClass);
		var updatedKillCount = currentKillCount + numberKilled;
		$("#hud").attr("data-number-killed-" + characterClass,updatedKillCount);

		$("#hud").find("#"+characterClass+"-killed").text(updatedKillCount.toString());

		// var max = $("#hud").attr("data-max-"+characterClass);
		// var percentage = Math.round((numberKilled/max)*100);
		// $("#hud").find("#"+characterClass+"-counter").css("width:" + percentage + "%");



	}


**/

$(document).ready(function(){


	/** CONSTANTS **/

	//Local Storage Keys

	var GAME_WIN_LOSS_CHECK_KEY = "gameWinLossCheckKey";
	var FLYMAN_GENERATOR_KEY = "flymanGeneratorKey";
	var RANDOM_CHARACTER_GENERATOR_KEY = "randomCharacterGeneratorKey";

	var TARGETED_CHARACTER_IDS = [];

	var targetArea = $("#target-area");
	var TARGET_AREA = $("#target-area");

	var getAllLocalStorageKeys = function(){

		return[GAME_WIN_LOSS_CHECK_KEY,FLYMAN_GENERATOR_KEY];
	}


	var createIntroScreenTitle = function(titleText){
		var title = $("<h1></h1>");

		title.text(titleText);

		return title;
	}

	var createIntroScreenText = function(introScreenText){
		var textElement = $("<p></p>");

		var styles = {
			"margin-bottom":"1em"
		}

		textElement.text(introScreenText).css(styles);

		return textElement;
	}

	var createStartButton = function(completionHandler){
		var startButton = $("<button>");

		startButton.addClass("btn").addClass("btn-primary").text("Start Game").on("click",function(){
			$(this).parent().remove();

			completionHandler();
		});

		return startButton;

	}

	var createHomeButton = function(){
		var homeButton = $("<button>");

		var styles = {
			"margin-left":"1em"
		}

		homeButton.addClass("btn").addClass("btn-warning").css(styles).text("Home").on("click",function(){
			window.location.href = "index.html";
		});

		return homeButton;

	}


	var createIntroScreen = function(titleText,introText1,introText2, completionHandler){
		var introWindow = $("<div></div>");

		var introStyles = {
			"position":"absolute",
			"padding":"2em",
			"width":"50%",
			"height":"auto",
			"left":"150px",
			"top":"150px",
			"border-color":"blue",
			"border-width":"10px",
			"border-style":"ridge",
			"color":"black",
			"background-color":"lightblue",
			"text-align":"center",
			"font-family":"Kreon"
		}

		introWindow.css(introStyles);


		var title = createIntroScreenTitle(titleText);

		var adbox = $("<div></div>");

		adbox.addClass("container");

		adbox.html("<script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\
			<ins class=\"adsbygoogle\"\
    			 style=\"display:block; text-align:center;\"\
    			 data-ad-layout=\"in-article\"\
    			 data-ad-format=\"fluid\"\
    				 data-ad-client=\"ca-pub-3595969991114166\"\
    				 data-ad-slot=\"6717344725\"></ins>\
			<script>\
   				 (adsbygoogle = window.adsbygoogle || []).push({});\
			</script>")
		
  
   		
			
		introWindow.append(title);

		introWindow.append(adbox);

		var text1 = createIntroScreenText(introText1);
		introWindow.append(text1);

		var text2 = createIntroScreenText(introText2);
		introWindow.append(text2);
	
		var startButton = createStartButton(completionHandler);

		introWindow.append(startButton);


		var homeButton = createHomeButton();
		introWindow.append(homeButton);


		return introWindow;

	};

	var presentIntroScreen = function(targetArea, completionHandler){
		
		var introScreen = createIntroScreen(
			"How to Play",
			"Kill enemies with the crosshair.  Click on the target area to move the crosshair. \
			To kill the enemy, position the crosshair over the enemy and click on the cross hair.",

			"Kill over 10 enemies to win the game.  If 20 or more enemies are on screen, \
			the enemy has taken over the earth and you. lose",completionHandler)

		targetArea.append(introScreen);

	}

	var getRandomPositionInTargetArea = function(targetArea){

		var offset = targetArea.offset();
		var left = offset.left
		var top = offset.top;
		var width = targetArea.width()
		var height = targetArea.height();

		var randomLeft = Math.floor(Math.random()*width) + left;
		var randomTop = Math.floor(Math.random()*height) + top;

		return [randomLeft,randomTop];

	}


	var getCenterPositionInTargetArea = function(targetArea){

		var offset = targetArea.offset();
		var left = offset.left
		var top = offset.top;
		var width = targetArea.width()
		var height = targetArea.height();

		var randomLeft = Math.floor(width/2.0) + left;
		var randomTop = Math.floor(height/2.0) + top;

		return [randomLeft,randomTop];

	}

	var isOutsideTargetArea = function(targetArea, randomLeft,randomTop, randomHeight, randomWidth){


		var isTooFarDown = randomHeight + randomTop > targetArea.offset().top + targetArea.height();
 		var isTooFarRight =  randomWidth + randomLeft > targetArea.offset().left + targetArea.width();

 		return isTooFarRight || isTooFarDown;


	}


	var createCloud = function(){
		var cloud = $("<img>");
		var cloudNumber = Math.floor(Math.random()*9) + 1;
		var imageExtension = ".png";

		cloud.attr("src","img/clouds/cloud" + cloudNumber + imageExtension);

		return cloud;

	}

	var appendRandomCloud = function(targetArea){
		
		var randomPos = getRandomPositionInTargetArea(targetArea);
		var randomWidth = Math.floor(Math.random()*100) + 100;
		var randomHeight = randomWidth*0.666;
		
		if(isOutsideTargetArea(targetArea,randomPos[0],randomPos[1],randomHeight,randomWidth)){
			return appendRandomCloud(targetArea);
		} else {


			var styles = {
				"position":"absolute",
				"top": randomPos[1] + "px",
				"left": randomPos[0] + "px",
				"width": randomWidth + "px",
				"height": randomHeight + "px"
			}

			localStorage.setItem("position-"+randomPos[0]+"-"+randomPos[1], randomPos[0] + "," + randomPos[1]);

			var cloud = createCloud().css(styles);

			targetArea.append(cloud);

		}




	}

	var appendCloudGroup = function(targetArea, numberOfClouds){
		for(var i = 0; i < numberOfClouds; i++){
			appendRandomCloud(targetArea);
		}
	}




	var getRandomPositionsFromLocalStorage = function(){

		var randomPositions = [];

		for(var positionKey in localStorage){
			if(localStorage.hasOwnProperty(positionKey)){

				if(positionKey.includes("position")){
					var positionString = localStorage.getItem(positionKey);
					var randomPos = positionString.split(",")
					randomPositions.push([parseInt(randomPos[0]),parseInt(randomPos[1])]);

				}
			}
		}

		return randomPositions;
	}

	var getRandomCrosshairImageName = function(){

		var crosshairs = [
			"crosshair_blue_large",
			"crosshair_blue_small",
			"crosshair_outline_large",
			"crosshair_outline_small",
			"crosshair_red_large",
			"crosshair_red_small"
		]

		var randomIndex = Math.floor(Math.random()*crosshairs.length) 

		return crosshairs[randomIndex];
	}

	var getCrossHairImagePath = function(){

		 var basePath = "img/crosshair/";

		 var imageName = getRandomCrosshairImageName();

		 var imageExtension = ".png";

		 return basePath + imageName + imageExtension;
	}

	/** 
	
	Helper Functions to test the location of mouseclick with respect to an object on screen; use these functions to help determine the movement of
	the crosshair in response to mouseclick events 

	**/

	var isToRight = function(object,clickX,clickY){

		var offset = object.offset();
		var left = offset.left;
		var right = offset.left + object.width();

		return clickX > right;

	}

	var isToLeft = function(object,clickX,clickY){

		var offset = object.offset();
		var left = offset.left;

		return clickX < left;

	}

	var isAbove = function(object,clickX,clickY){

		var offset = object.offset();
		var top = offset.top;

		return clickY < top;

	}

	var isBelow = function(object,clickX,clickY){

		var offset = object.offset();
		var top = offset.top;
		var bottom = offset.top + object.height();

		return clickY > bottom;

	}


	/** 

	Disable the all of the event handlers attached to the target area; 
	This is to make the target area unresponsive to mouseclicks and immobilize the crosshair 
	when the game state is game over, game win, and game pause

	**/

	var disableCrosshairMovement = function(targetArea){

	
		targetArea.off("click").off("mouseenter").off("mouseleave");

	
	}


	/** 

	Helper function to move the crosshair in reponse to mouseclick; the crosshair will move towards the mouseclick

	**/



	var moveCrossHair = function(crosshair,xPos,yPos){


			if(isAbove(crosshair,xPos,yPos) && isToRight(crosshair,xPos,yPos)){
				crosshair.css({
					"left":"+=20px",
					"top":"-=20px"
				});
			} else if(isAbove(crosshair,xPos,yPos) && isToLeft(crosshair,xPos,yPos)){
				crosshair.css({
					"left":"-=20px",
					"top":"-=20px"
				});
			} else if(isBelow(crosshair,xPos,yPos) && isToRight(crosshair,xPos,yPos)){
				crosshair.css({
					"left":"+=20px",
					"top":"+=20px"
				});
			} else if(isBelow(crosshair,xPos,yPos) && isToLeft(crosshair,xPos,yPos)){

				crosshair.css({
					"left":"-=20px",
					"top":"+=20px"
				});
			}else if(isAbove(crosshair,xPos,yPos)){

				crosshair.css({
					"top":"-=20px"
				});
			} else if(isBelow(crosshair,xPos,yPos)){

				crosshair.css({
					"top":"+=20px"
				});
			} else if(isToRight(crosshair,xPos,yPos)){

				crosshair.css({
					"left":"+=20px"
				});
			} else if(isToLeft(crosshair,xPos,yPos)){

				crosshair.css({
					"left":"-=20px"
				});
			}
	}


	/** 

	Helper function to attach an event handler to the target area so as to allow it to respond to mouseclicks and thereby
		allow the user to guide the movement of the crosshair

	**/

	

	var configureCrossHairForTargetAreaMovement = function(crosshair, targetArea){

		targetArea.on("click",function(e){
			var xPos = e.originalEvent.clientX;
			var yPos = e.originalEvent.clientY;

			moveCrossHair(crosshair,xPos,yPos);
			

		
		});
	}



	/** 
		Helper functions to restrict the movement of enemy characters within the boundaries of the target area
	**/


	var isTooFarTop = function(targetArea,object, movementOffset){

		var oTop = object.offset().top;
		
		var maxTop = targetArea.offset().top + movementOffset;

		return oTop < maxTop;
		
	}

	var isTooFarRight = function(targetArea, object,movementOffset){

		
		var oRight = object.offset().left + object.width();

		var maxRight = targetArea.offset().left + targetArea.width() - movementOffset;
	
		return oRight > maxRight;
	}

	var isTooFarLeft = function(targetArea,object,movementOffset){


		var oLeft = object.offset().left;

		var maxLeft = targetArea.offset().left + movementOffset;


		return oLeft < maxLeft;
	}

	var isTooFarBottom = function(targetArea,object,movementOffset){


		var oBottom = object.offset().top + object.height();

		var maxBottom = targetArea.offset().top + targetArea.height() - movementOffset;

		return oBottom > maxBottom;
	}

	var checkForWallCollision = function(targetArea,character,movementOffset){
		


			if(isTooFarLeft(targetArea,character,movementOffset)){
				// console.log("Was moving left...now moving right");
				// console.log("IS TOO FAR LEFT!!");
				// character.trigger("character:start-move-right");

				character.trigger("character:hit-wall");


			}

			if(isTooFarRight(targetArea,character,movementOffset)){
				// console.log("Was moving right...now moving left");

				// character.trigger("character:start-move-left");

				character.trigger("character:hit-wall");


			} 



			if(isTooFarBottom(targetArea,character,movementOffset)){
				// console.log("Was moving down...now moving up");
				// character.trigger("character:start-move-top");

				character.trigger("character:hit-wall");


			}

			

			if(isTooFarTop(targetArea,character,movementOffset)){
				// console.log("Was moving up...now moving down");

				// character.trigger("character:start-move-bottom");

				character.trigger("character:hit-wall");


			} 



	}

	var isMovingRight = function(character){

		var isMovingRight = character.attr("data-isMovingRight");


		return isMovingRight == true
	}

	var isMovingTop = function(character){

		var isMovingTop = character.attr("data-isMovingTop");




		return isMovingTop == true

	}

	var moveCharacter = function(character,deltaX,deltaY){



			if(isMovingRight(character)){
				var movementInfo = {
					"left":"+="+deltaX+"px"
				}
				character.css(movementInfo);
			} else {
				var movementInfo = {
					"left":"-=" + deltaX + "px"
				}
				character.css(movementInfo);
			} 

			if(isMovingTop(character)){
				var movementInfo = {
					"top":"-=" + deltaY + "px"
				}
				character.css(movementInfo);

			}else {
				var movementInfo = {
					"top":"+=" + deltaY + "px"
				}
				character.css(movementInfo);
			}
	}


	var randomizeCharacterDirection = function(character){
		var coinToss1 = Math.floor(Math.random()*2), coinToss2 = Math.floor(Math.random()*2)

		var isMovingUp = coinToss1, isMovingRight = coinToss2;


		character.attr("data-isMovingTop",isMovingUp);
		character.attr("data-isMovingRight",isMovingRight);
	}



	var configureCharacterMovementAnimation = function(targetArea, character,deltaX,deltaY,movementOffset){

		randomizeCharacterDirection(character);

		var characterMovementID = setInterval(function(){

			checkForWallCollision(targetArea,character,movementOffset);

			moveCharacter(character,deltaX,deltaY);
			



		},300);

		localStorage.setItem("characterMovement"+"-"+character.attr("id"),characterMovementID);

	}



	var stopCharacterMovementAnimation = function(character){
		//TODO: not yet implemented
		var characterID = character.attr("id");
		var key = "characterMovement-" + characterID;

		var characterMovementID_string = localStorage.getItem(key);

		if(characterMovementID_string){
			var characterMovementID = parseInt(characterMovementID_string);
			clearInterval(characterMovementID);		
		}
	}

	var stopAllCharacterMovement = function(){
		//TODO: not yet implemented

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





	var getCharacterFromID = function(characterID){

		return $("#"+characterID);
	}


	/** Updates the kill count for each enemy character based on whether or not the character contains the class corresponding to the character name **/
	var updateCharacterKillCount_v2 = function(character){

			if(character.hasClass("evilsun")){

				var currentKillCount = parseInt(localStorage.getItem("evilsun-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("evilsun-killcount",updatedKillCount);

			} else if(character.hasClass("flyman")){

				var currentKillCount = parseInt(localStorage.getItem("flyman-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("flyman-killcount",updatedKillCount);

			} else if(character.hasClass("spikeball")){

				var currentKillCount = parseInt(localStorage.getItem("spikeball-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("spikeball-killcount",updatedKillCount);

			} else if(character.hasClass("evilcloud")){
				var currentKillCount = parseInt(localStorage.getItem("evilcloud-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("evilcloud-killcount",updatedKillCount);
			}

	}

	/** Updates the kill count for each enemy character based on whether or not the characterID string contains the name of the character **/
	var updateCharacterKillCount = function(characterID){

			if(characterID.includes("evilsun")){

				var currentKillCount = parseInt(localStorage.getItem("evilsun-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("evilsun-killcount",updatedKillCount);

			} else if(characterID.includes("flyman")){

				var currentKillCount = parseInt(localStorage.getItem("flyman-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("flyman-killcount",updatedKillCount);

			} else if(characterID.includes("spikeball")){

				var currentKillCount = parseInt(localStorage.getItem("spikeball-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("spikeball-killcount",updatedKillCount);

			} else if(characterID.includes("evilcloud")){
				var currentKillCount = parseInt(localStorage.getItem("evilcloud-killcount"));
				var updatedKillCount = currentKillCount + 1;
				localStorage.setItem("evilcloud-killcount",updatedKillCount);
			}
	}


	var decrementOnScreenCharacterCount = function(character){
		if(character.hasClass("flyman")){

				updateOnScreenCharacterCount("flyman",-1);

		} else if(character.hasClass("spikeball")){

				updateOnScreenCharacterCount("spikeball",-1);


		} else if(character.hasClass("evilsun")){

				updateOnScreenCharacterCount("evilsun",-1);


		} else if(character.hasClass("evilcloud")){

				updateOnScreenCharacterCount("evilcloud",-1);

		}
	}


	var destroyCharacter = function(character){

		if(character.hasClass("character")){
			explodeElement(character);

			updateCharacterKillCount_v2(character);

			decrementOnScreenCharacterCount(character);

			character.removeClass("character");
		}

	}

	var appendCrosshair = function(targetArea){


		var crossHairImagePath = getCrossHairImagePath();

		var crosshair = $("<img>");

		var centerPoint = getCenterPositionInTargetArea(targetArea);

		var styles = {
			"position":"absolute",
			"left": centerPoint[0] + "px",
			"top": centerPoint[1] + "px",
			"z-index":"10"
		}

		crosshair.attr("src",crossHairImagePath).css(styles).on("click",function(){
			console.log("Crosshair has been clicked");

			console.log(TARGETED_CHARACTER_IDS.length);

			if(TARGETED_CHARACTER_IDS.length > 0){
				$.each(TARGETED_CHARACTER_IDS,function(index,characterID){
					console.log("Character destroyed");

					var character = getCharacterFromID(characterID);

					destroyCharacter(character);


				});
			}

		});

		crosshair.on("mouseenter",function(){
			console.log("Mouse is NOW over crosshair...Begin testing for overlap enemies");

			var activeTargetingID = setInterval(function(){
				console.log("Testing for targeted characters....");

				targetArea.children('.character').each(function(index){
					if(isOverlapping($(this),crosshair)){

						var targetedCharacterID = $(this).attr("id");

						if(!TARGETED_CHARACTER_IDS.includes(targetedCharacterID)){
							console.log("Adding character to targeted characters...");
							TARGETED_CHARACTER_IDS.push(targetedCharacterID);
						}
					}
				});

			},200);

			crosshair.attr("activeTargetingID",activeTargetingID);

		}).on("mouseleave",function(){
			console.log("Mouse is NO LONGER over crosshair...Stop testing for overlap with enemies");
				TARGETED_CHARACTERS = [];

				var activeTargetingID = crosshair.attr("activeTargetingID");

				if(activeTargetingID){
					clearInterval(activeTargetingID);
				}
		})

		configureCrossHairForTargetAreaMovement(crosshair,targetArea);


		targetArea.append(crosshair);

	}


	var configureAnimation = function(character,imageBasePath,imageExtension,textureNames,animationInterval){

		if(!character.is("img")){
			console.log("Error: could not configure animation for this character because it is not an img tag");
			return;
		}

		var i = 0;

		var animationID = setInterval(function(){

			if(i < textureNames.length){
				character.attr("src",imageBasePath+textureNames[i]+imageExtension);
				i++;
			} else {
				i = 0;
			}


		},animationInterval);

		return animationID;
	}

	var configureDefaultTexture = function(character,imageBasePath,textureName,imageExtension){

		if(!character.is("img")){
			console.log("Error: could not configure animation for this character because it is not an img tag");
			return;
		}
		
			
		character.attr("src",imageBasePath+textureName+imageExtension);
		
	}

	var configureCharacterBaseStyles = function(character){
		
		var baseStyles = {
			"position":"absolute",
			"z-index":"5",
			"width": "8%",
			"height": "15%"
		}

		character.css(baseStyles).addClass('character');

	}


	var configureIDforCharacter = function(character){

		var className = character.attr('class');

		var storageKey = "number-of-"+className;

		if(localStorage.getItem(storageKey)){
			var currentNumber = localStorage.getItem(storageKey);
			currentNumber++;
			localStorage.setItem(storageKey,currentNumber);
			character.attr("id",className + currentNumber);

		} else {
			localStorage.setItem(storageKey,1);
			character.attr("id",className + currentNumber);

		}
	}

	var configureCharacterEventHandlers = function(character){

		character.on("character:hit-wall",function(){

			randomizeCharacterDirection(character);
			appendExistingCharacterAtRandomPosition(character,null,null);
		});

		// character.on("character:start-move-top",function(){
			
	
		// 	startMovingCharacterUp(character);

		// });


		// character.on("character:start-move-right",function(){
		

		// 	startMovingCharacterRight(character);

		// });


		// character.on("character:start-move-left",function(){
		// 	character.attr("data-isMovingRight",false);

		// });

		// character.on("character:start-move-bottom",function(){
		// 	character.attr("data-isMovingTop",false);


		// });


	}



var constructImagePath = function(basePath,imageName,imageExtension){

		return basePath + imageName + imageExtension;
	}

	

var removeCharacterClasses = function(element){

	var allCharacterNames = ["flyman","spikeball","evilsun","evilcloud"];

	element.removeClass("character");

	$.each(function(index,characterName){
		if(element.hasClass(characterName)){
			element.removeClass(characterName);
		}
	});

}

var explodeElement = function(element,isRemoved = true){

		if(!element.is("img")){
			console.log("Error: the element is NOT an image.  Cannot use explosion animation.")
			return;
		}

		/** If the explosionAnimationID has already been set, the character is already in the process of exploding **/
		if(element.attr("explosionAnimationID")){
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


		element.attr("explosionAnimationID",explosionAnimationID);


	}

	var storeAnimationIntervalTimerID = function(key,timerID){

	
		localStorage.setItem(key,timerID);
	
}

	


	var createSpikeball = function(){
		var spikeball = $("<img>");

		configureCharacterBaseStyles(spikeball);

		configureIDforCharacter(spikeball);

		configureCharacterEventHandlers(spikeball);

		spikeball.addClass('spikeball');


		var basePath = "./img/characters/";

		var textures = [
			"spikeBall2",
			"spikeBall1"
		]

		var imageExtension = ".png";

		configureDefaultTexture(spikeball,basePath,textures[0],imageExtension);

		//var spikeBallAnimationID = configureAnimation(spikeball,"/img/characters/",".png",textures,3000);


		return spikeball;
	}

	var createFlyman = function(){
		var flyMan = $("<img>");

		configureCharacterBaseStyles(flyMan);

		configureIDforCharacter(flyMan);

		configureCharacterEventHandlers(flyMan);

		flyMan.addClass('flyman');

		var basePath = "./img/characters/";

		var textures = [
			"flyMan1",
			"flyMan2",
			"flyMan3",
			"flyMan2",
			"flyMan1"
		]

		var imageExtension = ".png";

		configureDefaultTexture(flyMan,basePath,textures[0],imageExtension);


		//var flymanAnimation2D = configureAnimation(flyMan,"/img/characters/",".png",textures,3000);

		return flyMan;

	}



	/** Pass in the <span> counter element whose text node needs to be updated **/
	var updateTextForCounter = function(counter){


  			var counterID = counter.attr("id");

  			console.log("Updating text for counter with ID: " + counterID);

			if(counterID.includes("evilsun")){


				var killCount = localStorage.getItem("evilsun-killcount");

  				console.log("The current kill count for " + counterID + " is: " + killCount);

				if(killCount){

					counter.text(killCount.toString());
				}
				

			} else if(counterID.includes("flyman")){

				var killCount = localStorage.getItem("flyman-killcount");

				  console.log("The current kill count for " + counterID + " is: " + killCount);


				if(killCount){
					counter.text(killCount.toString());
				}

			} else if(counterID.includes("spikeball")){

				var killCount = localStorage.getItem("spikeball-killcount");


				 console.log("The current kill count for " + counterID + " is: " + killCount);


				if(killCount){
					counter.text(killCount.toString());
				}

			} else if(counterID.includes("evilcloud")){

					var killCount = localStorage.getItem("evilcloud-killcount");


				  	console.log("The current kill count for " + counterID + " is: " + killCount);


				if(killCount){
				
					counter.text(killCount.toString());
				}
			}
		}




	var registerProgressModalHandler = function(){

		$('#progress-modal').on('show.bs.modal', function (e) {

			console.log("Determing enemies killed for each enemy....");
  	
  			var modalBody = $(this).find(".modal-body");

  			modalBody.children().each(function(index){

  				var counter = $(this).children("span");
  			
  				updateTextForCounter(counter);

  				})
  			})

	}



	
	var appendExistingCharacterAtRandomLeftPosition = function(character){
		appendExistingCharacterAtRandomPosition(character, true, null);
	}

	var appendExistingCharacterAtRandomBottomPosition = function(character){
		appendExistingCharacterAtRandomPosition(character, null, true);

	}

	var appendExistingCharacterAtRandomPosition = function(character,alongLeft,alongBottom){

		var targetArea = $("#target-area");

		var randomPos = getRandomPositionInTargetArea(targetArea);
		var randomLeft = randomPos[0];
		var randomTop = randomPos[1];


		var topPosition = randomTop;
		var leftPosition = randomLeft;

		if(alongLeft != null && alongLeft == true){
			leftPosition = targetArea.offset().left + 100;
		}

		if(alongBottom != null && alongBottom == true){
			topPosition = (targetArea.offset().top + targetArea.height() - 100)
		}

		var positionInfo = {
			"left": topPosition + "px",
			"top" : leftPosition + "px"
		}

		character.css(positionInfo);

		targetArea.append(character);
	}


	var startMovingCharacterUp = function(character){


		character.attr("data-isMovingTop",true);
		character.css({
			"top":"-=50px"
		});
	}


	var startMovingCharacterRight = function(character){


		character.attr("data-isMovingRight",true);
		character.css({
			"left":"+=50px"
		});
	}


	var getRandomCharacterName = function(){

		var allCharacters = ["flyman","spikeball"];

		var randomIndex = Math.floor(Math.random()*allCharacters.length);

		return allCharacters[randomIndex];

	}


	var startFlymanGenerator = function(timeInterval){


		var timerID = setInterval(function(){

			appendCharacterAtRandomPosition(targetArea,"flyman");

		}, timeInterval);

		localStorage.setItem(FLYMAN_GENERATOR_KEY,timerID);
	}

	


	var startRandomCharacterGenerator = function(targetArea,timeInterval){

		var timerID = setInterval(function(){

			var characterName = getRandomCharacterName();

			appendCharacterAtRandomPosition(targetArea,characterName);

		}, timeInterval);


		localStorage.setItem(RANDOM_CHARACTER_GENERATOR_KEY,timerID);

	}



	var appendCharacterAtRandomPosition = function(targetArea,characterName){

		var character;

		switch(characterName){
			case "flyman":
				character = createFlyman();
				configureCharacterMovementAnimation(targetArea, character,30,30,30);
				break;
			case "spikeball":
				character = createSpikeball();
				configureCharacterMovementAnimation(targetArea, character,30,30,5);
				break;
			default:
				character = createSpikeball();
				configureCharacterMovementAnimation(targetArea, character,30,30,10);
				break;
		}

		updateOnScreenCharacterCount(characterName,1);


		var randomPos = getRandomPositionInTargetArea(targetArea);
		var randomLeft = randomPos[0];
		var randomTop = randomPos[1];

		var positionInfo = {
			"left": randomLeft + "px",
			"top" : randomTop + "px"
		}

		character.css(positionInfo);

		targetArea.append(character);


	}

	var initializeLocalStorage = function(){

		if(localStorage.getItem("evilsun-killcount")){
			delete localStorage["evilsun-killcount"];
		}

		if(localStorage.getItem("spikeball-killcount")){
			delete localStorage["spikeball-killcount"];
		}

		if(localStorage.getItem("evilcloud-killcount")){
			delete localStorage["evilcloud-killcount"];
		}

		if(localStorage.getItem("flyman-killcount")){
			delete localStorage["flyman-killcount"];
		}

		localStorage.setItem("evilsun-killcount",0);
		localStorage.setItem("evilcloud-killcount",0);
		localStorage.setItem("spikeball-killcount",0);
		localStorage.setItem("flyman-killcount",0);

		localStorage.setItem("total-onscreen-evilsun",0);
		localStorage.setItem("total-onscreen-spikeball",0);
		localStorage.setItem("total-onscreen-evilcloud",0);
		localStorage.setItem("total-onscreen-flyman",0);

	}


	var updateOnScreenCharacterCount = function(characterName, delta){

		var characterCount_string = localStorage.getItem("total-onscreen-"+characterName);

		if(characterCount_string){
			var characterCount = parseInt(characterCount_string);
			var updatedCount = characterCount + delta;
			localStorage.setItem("total-onscreen-"+characterName,updatedCount);
		} else {
			localStorage.setItem("total-onscreen-"+characterName,delta);
		}
	}


	var getTotalOnscreenEnemies = function(){
		var evilSun_onScreen = parseInt(localStorage.getItem("total-onscreen-evilsun"));
		var evilCloud_onScreen = parseInt(localStorage.getItem("total-onscreen-evilcloud"));
		var spikeBall_onScreen = parseInt(localStorage.getItem("total-onscreen-spikeball"));
		var flyMan_onScreen = parseInt(localStorage.getItem("total-onscreen-flyman"));

		return evilSun_onScreen + evilCloud_onScreen + spikeBall_onScreen + flyMan_onScreen;

	}

	var getTotalKillCount = function(){
		var evilSun_killCount = parseInt(localStorage.getItem("evilsun-killcount"));
		var evilCloud_killCount = parseInt(localStorage.getItem("evilcloud-killcount"));
		var spikeBall_killCount = parseInt(localStorage.getItem("spikeball-killcount"));
		var flyMan_killCount = parseInt(localStorage.getItem("flyman-killcount"));

		return evilSun_killCount + evilCloud_killCount + spikeBall_killCount + flyMan_killCount;

	}

	var isTotalOnScreenCountAboveMax = function(maxOnScreenEnemies){

		console.log("The total on screen enemies is: " + getTotalOnscreenEnemies());
		return getTotalOnscreenEnemies() > maxOnScreenEnemies;
	}


	var isTotalKillCountAboveMax = function(maxKillCount){

		console.log("Checking total kill count...Total kill count is: " + getTotalKillCount());

		return getTotalKillCount() > maxKillCount

	}


	var removeAllCharacters = function(targetArea){

		targetArea.children(".character").each(function(index){
			if($(this).hasClass("character")){
				$(this).remove();
			}
		});
	}

	var checkForGameWinLossConditions = function(targetArea){

		var timerID = setInterval(function(){

			if(isTotalKillCountAboveMax(10)){
				console.log("Game Win! Total enemies killed is above max!");
				disableFlymanGenerator();
				disableCrosshairMovement(targetArea);
				showGameSummary(true);
				disableGameOverCheckTimer();

				removeAllCharacters(targetArea);

				return;
			};

			if(isTotalOnScreenCountAboveMax(20)){
				console.log("Game Loss! Total on screen enemies is above max!");
				disableFlymanGenerator();
				disableCrosshairMovement(targetArea);
				showGameSummary(false);
				disableGameOverCheckTimer();
				removeAllCharacters(targetArea);

				return;
			};


		},500);

		localStorage.setItem(GAME_WIN_LOSS_CHECK_KEY,timerID);
	}





	var showGameSummary = function(hasWon){

		var gameSummary = $("<div></div>");

		var title = $("<h1></h1>");

		title.text(hasWon ? "Congratulations! You won!" : "Game Over! Enemies have taken over the screen!");

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


		var backHomeButton = $("<button>");

		backHomeButton.text("Home");

		var styles2 = {
			"margin-left":"5px"
		}

		backHomeButton.css(styles2);

		backHomeButton.attr("id","back-home-button");

		backHomeButton.on("click",function(){
			window.location.href = "./index.html";
		});

		gameSummary.append(backHomeButton);

		gameSummary.css(styles);

		$("body").append(gameSummary);
	}


	/** CLEAN-UP FUNCTIONS

	Clear all the timer IDs from local storage both at the start of the game and at the end **/

	/**All timers should be cleared from local storage upon completion, including:

		- Character generator/spawning timers
		- Character animation timers
		- Collision checking timers
		- Game win/loss conditino evaluation timers

	**/


	var clearAllGameKeysFromLocalStorage = function(){
		for(var positionKey in localStorage){
			if(localStorage.hasOwnProperty(positionKey)){
				delete localStorage[positionKey];
			}
		}
	}


	var clearTimerIDs = function(){
		$.each(getAllLocalStorageKeys(),function(index,key){

			var storedTimerID_string = localStorage.getItem(key);

			if(storedTimerID_string){
				var storedTimerID = parseInt(storedTimerID_string);
				clearInterval(storedTimerID);
			}
		});
	}

	var disableGameOverCheckTimer = function(){

		var timerID_string = localStorage.getItem(GAME_WIN_LOSS_CHECK_KEY);

		if(timerID_string){
			var timerID = parseInt(timerID_string);
			clearInterval(timerID);
		}
	}

	var disableFlymanGenerator = function(){


		var idString = localStorage.getItem(FLYMAN_GENERATOR_KEY);

		if(idString){

			var flymanGeneratorID = parseInt(idString);

			clearInterval(flymanGeneratorID);
		}
	}


		var disableRandomCharacterGenerator = function(){

		var timerID_string = localStorage.getItem(RANDOM_CHARACTER_GENERATOR_KEY);

		if(timerID_string){
			var timer_ID = parseInt(timerID_string);
			clearInterval(timer_ID);
		}
	}




	var startGame = function(){
		clearAllGameKeysFromLocalStorage();

		initializeLocalStorage();

		presentIntroScreen(targetArea, function(){

			appendCloudGroup(targetArea, 5);

	
			registerProgressModalHandler();

			appendCrosshair(targetArea);

			startFlymanGenerator(5000);

			checkForGameWinLossConditions(targetArea);
		});
	}

	startGame();
	

});