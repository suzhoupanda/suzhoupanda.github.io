$(document).ready(function(){

	

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
				textures.push("gold_1.png","gold_2.png","gold_3.png","gold_4.png","gold_3.png","gold_2.png","gold_1.png");
				break;
			case "silver":
				textures.push("silver_1.png","silver_2.png","silver_3.png","silver_4.png","silver_3.png","silver_2.png","silver_1.png");
				break;
			case "bronze":
				textures.push("bronze_1.png","bronze_2.png","bronze_3.png","bronze_4.png","bronze_3.png","bronze_2.png","bronze_1.png");
				break;
		}


		var i = 0;

		var interval = animationDuration/textures.length;

		setInterval(function(){

			if(i > textures.length - 1){
				i = 0;
			}

			var imagePath = basePath + textures[i];
			element.attr("src",imagePath);

			element.css("top","+=5.0");


			i ++;

		},interval);

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




		setInterval(function(){


			element.css("top","+="+animationDuration);


		

		},0.01);

	}


	var createFlyMan = function(container, initialTop,initialLeft, width, height, animationDuration, flymanID){

		console.log("Creating image element....");

		var element = $("<img>");

		container.append(element);


		element.css("position","absolute");
		element.attr("src","img/characters/wingMan1.png");
		element.attr("alt","Flyman");

		element.attr("health",10);
		element.attr("gold-coins",0);
		element.attr("silver-coins",0);
		element.attr("bronze-coins",0);
		element.attr("isInContact",false);

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

	var registerUserClickHandlers = function(){

		var flyman = $("#main-flyman");

		$("#up").on('click', function(){
			console.log("You clicked the UP button.");
			flyman.css("top","-=50");
		});

		$("#down").on('click', function(){
			console.log("You clicked the DOWN button.");
			flyman.css("top","+=50");

		});


		$("#right").on('click', function(){
			console.log("You clicked the RIGHT button.");
			flyman.css("left","+=50");

		});

		$("#left").on('click', function(){
			console.log("You clicked the LEFT button.");
			flyman.css("left","-=50")

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

	$("#toggle-hud").on("click",function(e){
		var HUD = $("#hud-display");

		HUD.hide();

		var showHUDButton = $("<button>");

		$("#target-area").append(showHUDButton);

		showHUDButton.text("Show HUD");
		showHUDButton.attr("id","show-hud-button");

		var styles = {
			"position":"fixed",
			"bottom":"0px",
			"right":"0px",
			"width":"20%",
			"height":"3em"
		}

		showHUDButton.css(styles);

		showHUDButton.on("click",function(e){
			HUD.show();
			$(this).hide();
		});

	});

	
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

		var textureAnimationID = setInterval(function(){

	

			if(i < explosionTextures.length-1){

				var imagePath = constructImagePath(basePath,explosionTextures[i],imageExtension);
				element.attr("src",imagePath);
				i++;

			} else {
				var textureAnimationID = element.attr("explosionAnimationID");
				clearInterval(explosionAnimationID);
				if(isRemoved){
					element.remove();
				}
			}
		},100);


		element.attr("explosionAnimationID",textureAnimationID);


	}
	

	var targetArea = $("#target-area");

	console.log("Target Area - Left Boundary:" + targetArea.css("left"));
	console.log("Target Area - Right Boundary:"+ targetArea.css("right"));
	console.log("Target Area - Top Boundary:"+ targetArea.css("top"));
	console.log("Target Area - Bottom Boundary:"+ targetArea.css("bottom"));

	console.log("Target Area - Left Boundary:" + targetArea.css("left"));
	console.log("Target Area - Right Boundary:"+ targetArea.css("right"));
	console.log("Target Area - Top Boundary:"+ targetArea.css("top"));
	console.log("Target Area - Bottom Boundary:"+ targetArea.css("bottom"));





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

		if(player.attr("health") != undefined){

				var originalHealth = player.attr("health");
				var updatedHealth = parseInt(originalHealth) + deltaHealth;
				updateHUD(updatedHealth);

				if(updatedHealth <= 0){
					explodeElement(player);
				}

				player.attr("health", updatedHealth);
				console.log("The new player health is " + player.attr("health"));

		} else {
			console.log("The player does not have an attribute 'health' ");
		}
	
	};

	var adjustCoinCount = function(player, coinType, deltaCoinAmount){
		
		switch(coinType){
			case "gold":
				if(player.attr("gold-coins") != undefined){
					var originalGoldCount = player.attr("gold-coins");
					var updatedGoldCount = parseInt(originalGoldCount) + deltaCoinAmount;
					player.attr("gold-coins",updatedGoldCount);
					console.log("The player's gold coin coun is now: " + updatedGoldCount);
				} else {
					console.log("Player has no attribute 'gold-coins' ");
				}
				break;
			case "silver":
				if(player.attr("silver-coins") != undefined){
					var originalSilverCount = player.attr("silver-coins");
					var updatedSilverCount = parseInt(originalSilverCount) + deltaCoinAmount;
					player.attr("silver-coins",updatedSilverCount);
					console.log("The player's silver coin coun is now: " + updatedSilverCount);

				} else {
					console.log("Player has no attribute 'silver-coins' ");
				}
				break; 
			case "bronze":
				if(player.attr("bronze-coins") != undefined){
					var originalBronzeCount = player.attr("bronze-coins");
					var updatedBronzeCount = parseInt(originalBronzeCount) + deltaCoinAmount;
					player.attr("bronze-coins",updatedBronzeCount);
					console.log("The player's bronze coin coun is now: " + updatedBronzeCount);

				} else {
					console.log("Player has no attribute 'bronze-coins' ");
				}
				break;
		}
	}


	var testForPlayerCollisions = function(){

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

				sessionStorage.setItem("playerDidBeginContact",true);

				//console.log("The player with position (top,left)  (" + player.position().top + ", " +  player.position().left + ")" + " was contacted");
				
				// var isInContact = player.attr("isInContact");

				//if(isInContact != undefined && isInContact != false){
				//if(sessionStorage.getItem('playerDidBeginContact') == false){
						// player.attr('isInContact',true);

						adjustPlayerHealth(player,-1);

					var damageAnimationID = setInterval(function(){
						var currentOpacity = player.css('opacity');

						if(currentOpacity == "1"){
							player.css('opacity',"0.5");
						} else {
							player.css('opacity',"1");
						}

					},100);

					// player.attr("isInContact",true);

					setTimeout(function(){
						console.log("Turning off player contact");
						clearInterval(damageAnimationID);
						player.css('opacity',"1");
						sessionStorage.setItem("playerDidBeginContact",false);
						player.attr("isInContact",false);
					},1500);
				//} 

					
				
				//}
			},
			function(meteor){
				//console.log("The meteor with position " + meteor.position() + " was contacted");
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
				adjustCoinCount(player,"silver",1);
			},function(coin){
				coin.remove();
			});

	};


	var createMeteorShower = function(){

		var meteorNumber = 0;

		var meteorCreatorID = setInterval(function(){

			var randomMeteoryType = Math.floor(Math.random()*3)+1
			var randomMeteorWidth = (Math.floor(Math.random()*100) + 30)
			var randomMeteorHeight = randomMeteorWidth;

			var areaOffset = targetArea.offset();
			var areaTop = areaOffset.top;
			var areaLeft = areaOffset.left;
			var areaWidth = targetArea.width();
			var areaHeight = targetArea.height();

			var randomLeft = Math.floor(Math.random()*areaWidth) + areaLeft;
			var randomTop = areaTop - 100;

			var randomSpeed =  1 + Math.floor(Math.random()*2);


			createMeteor(targetArea, randomMeteoryType, randomTop, randomLeft, randomMeteorWidth, randomMeteorHeight, randomSpeed, "meteor" + meteorNumber);
			meteorNumber++;

		},1000);

		return meteorCreatorID;

	}


	var createRandomFrequencyMeteorShower = function(frequency){

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

			var areaOffset = targetArea.offset();
			var areaTop = areaOffset.top;
			var areaLeft = areaOffset.left;
			var areaWidth = targetArea.width();
			var areaHeight = targetArea.height();

			var randomLeft = Math.floor(Math.random()*areaWidth) + areaLeft;
			var randomTop = areaTop - 100;

			var randomSpeed =  1 + Math.floor(Math.random()*2);


			createMeteor(targetArea, randomMeteoryType, randomTop, randomLeft, randomMeteorWidth, randomMeteorHeight, randomSpeed, "meteor" + meteorNumber);
			meteorNumber++;

		},frequency);


	}

	var startGame = function(){

		sessionStorage.setItem("playerDidBeginContact",false);

		setupBackgroundWithChildImage(targetArea);

		showMainTitle(targetArea,"Meteor Escape",3000);

		createRandomClouds(targetArea,10);

		createCoin(targetArea,"gold",100, 800, 100, 100,600,"gold1");

		createFlyMan(targetArea, 300,500, 100, 80, 500, "main-flyman");

		createMeteorShower();

		registerUserClickHandlers();

		setInterval(testForPlayerCollisions,500);

	}

	startGame();

	


});