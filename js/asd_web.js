
//TODO: optimize by pre-loading images, define function on for the entire document scope
	//Bugfix: character texture animations not loading
	
//TODO: define class for character so that animations for the character can run and stopped more conveniently 

//TODO: use a progress bar for HUD to represent number killed, health, etc.

//TODO: make sure to clear the storage of all existing IDs, etc.

//TODO: character moves in upward movement until it encounters border then moves in opposite direction; likewise for horizontal movement

//TODO: if character is behind cloud, then it cannot be fired upon

//TODO: vary character widths 


$(document).ready(function(){

	var targetArea = $("#target-area");


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
		introWindow.append(title);

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
			"Kill enemies with the crosshair.  Click on the target area to move the crosshair.  \
			To fire upon an enemy, click inside the crosshair.",
			"Position the crosshair over an enemy and click inside the crosshair to fire. \
			An enemy must be inside the crosshair in order to be killed.",completionHandler)

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


	var clearPositionDataFromLocalStorage = function(){
		for(var positionKey in localStorage){
			if(localStorage.hasOwnProperty(positionKey)){
				delete localStorage[positionKey];
			}
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
		
			var isMovingRight = character.attr("data-isMovingRight");
			var isMovingTop = character.attr("data-isMovingTop");

			if(isTooFarRight(targetArea,character,movementOffset) && isMovingRight){
				character.attr("data-isMovingRight",false);
			} 

			if(isTooFarLeft(targetArea,character,movementOffset) && !isMovingRight){
				console.log("IS TOO FAR LEFT!!");

				character.attr("data-isMovingRight",true);
			}

			if(isTooFarTop(targetArea,character,movementOffset) && isMovingTop){
				character.attr("data-isMovingTop",false);
			} 

			if(isTooFarBottom(targetArea,character,movementOffset) && !isMovingTop){
				console.log("IS TOO FAR BOTTOM!!");
				character.attr("data-isMovingTop",true);
			}


	}

	var moveCharacter = function(character,deltaX,deltaY){


			var isMovingRight = parseInt(character.attr("data-isMovingRight"));

			if(isMovingRight == true){
				var movementInfo = {
					"left":"+="+deltaX+"px"
				}
				character.css(movementInfo);
			} else if(isMovingRight == false) {
				var movementInfo = {
					"left":"-=" + deltaX + "px"
				}
				character.css(movementInfo);
			}

			var isMovingTop = parseInt(character.attr("data-isMovingTop"));

			if(isMovingTop == true){
				var movementInfo = {
					"top":"-=" + deltaY + "px"
				}
				character.css(movementInfo);

			}else if(isMovingTop == false){
				var movementInfo = {
					"top":"+=" + deltaY + "px"
				}
				character.css(movementInfo);
			}
	}

	var configureCharacterMovementAnimation = function(targetArea, character,deltaX,deltaY,movementOffset){

		var coinToss1 = Math.floor(Math.random()*2), coinToss2 = Math.floor(Math.random()*2)

		var isMovingUp = coinToss1, isMovingRight = coinToss2;


		character.attr("data-isMovingTop",isMovingUp);
		character.attr("data-isMovingRight",isMovingRight);

		var characterMovementID = setInterval(function(){

			checkForWallCollision(targetArea,character,movementOffset);

			moveCharacter(character,deltaX,deltaY);
			



		},300);

		localStorage.setItem("characterMovement"+"-"+character.attr("id"),"characterMovementID");

	}

	var stopCharacterMovement = function(character){
		//TODO: not yet implemented
	}

	var stopAllCharacterMovement = function(){
		//TODO: not yet implemented

	}


	var disableCrosshairMovement = function(targetArea){

	
		targetArea.off("click").off("mouseenter").off("mouseleave");

	
	}


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

	

	var configureCrossHairForTargetAreaMovement = function(crosshair, targetArea){

		targetArea.on("click",function(e){
			var xPos = e.originalEvent.clientX;
			var yPos = e.originalEvent.clientY;

			//console.log("X-Pos: " + xPos + ", Y-Pos: " + yPos);

			moveCrossHair(crosshair,xPos,yPos);
			

		
		});
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



	var TARGETED_CHARACTER_IDS = [];

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

					$("#"+characterID).remove();
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


	var createSpikeball = function(){
		var spikeball = $("<img>");

		configureCharacterBaseStyles(spikeball);

		configureIDforCharacter(spikeball);

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


	clearPositionDataFromLocalStorage();

	presentIntroScreen(targetArea, function(){

		appendCloudGroup(targetArea, 5);

		var randomPositions = getRandomPositionsFromLocalStorage();
		for(var index in randomPositions){
			console.log(randomPositions[index]);
		}

		appendCrosshair(targetArea);

		appendCharacterAtRandomPosition(targetArea,"flyman");


	});

});