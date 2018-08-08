
//TODO: optimize by pre-loading images, define function on for the entire document scope

//TODO: define class for character so that animations for the character can run and stopped more conveniently 


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

			console.log("X-Pos: " + xPos + ", Y-Pos: " + yPos);

			moveCrossHair(crosshair,xPos,yPos);

		
		});
	}

	var appendCrosshair = function(targetArea){


		var crossHairImagePath = getCrossHairImagePath();

		var crosshair = $("<img>");

		var centerPoint = getCenterPositionInTargetArea(targetArea);

		var styles = {
			"position":"absolute",
			"left": centerPoint[0] + "px",
			"top": centerPoint[1] + "px"
		}

		crosshair.attr("src",crossHairImagePath).css(styles).on("click",function(){
			console.log("Crosshair has been clicked");

			
			

		});

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
			"position":"absolute"
		}

		character.css(baseStyles);
	}


	var createSpikeball = function(){
		var spikeball = $("<img>");

		configureCharacterBaseStyles(spikeball);

		var basePath = "./img/characters/";

		var textures = [
			"spikeBall2",
			"spikeBall1"
		]

		var imageExtension = ".png";

		configureDefaultTexture(spikeball,basePath,textures[0],imageExtension);

		var spikeBallAnimationID = configureAnimation(spikeball,"/img/characters/",".png",textures,3000);

		return spikeball;
	}

	var createFlyman = function(){
		var flyMan = $("<img>");

		configureCharacterBaseStyles(flyMan);

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


		var flymanAnimation2D = configureAnimation(flyMan,"/img/characters/",".png",textures,3000);

		return flyMan;

	}

	var appendCharacterAtRandomPosition = function(targetArea,characterName){

		var character;

		switch(characterName){
			case "flyman":
				character = createFlyman();
				break;
			case "spikeball":
				character = createSpikeball();
				break;
			default:
				character = createSpikeball();
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