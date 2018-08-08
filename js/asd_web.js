
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



	clearPositionDataFromLocalStorage();

	presentIntroScreen(targetArea, function(){

		appendCloudGroup(targetArea, 5);

		var randomPositions = getRandomPositionsFromLocalStorage();
		for(var index in randomPositions){
			console.log(randomPositions[index]);
		}



	});

});