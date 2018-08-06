$(document).ready(function(){

	
	var showDimensions = function(element){
		var styleWidth = element.style.width;
		var styleHeight = element.style.height;

		console.log("The element has the following style dimensions: ");
		console.log("Style Width: " + styleWidth);
		console.log("Style Height: " + styleHeight);


		var offsetWidth = element.offsetWidth;
		var offsetHeight = element.offsetHeight;

		console.log("The element has the following offset dimensions: ");
		console.log("Style Width: " + offsetWidth);
		console.log("Style Height: " + offsetHeight);
	};

	var getRandomAbsolutePosition = function(parent,child){

		var parentRect = parent.getBoundingClientRect();
		var targetRect = child.getBoundingClientRect();

		var topPos = Math.floor(Math.random()*parentRect.height - targetRect.height);
		var leftPos = Math.floor(Math.random()*parentRect.width - targetRect.width);

		if((topPos + targetRect.height) > parentRect.bottom || (leftPos + targetRect.width) > parentRect.right){
			return getRandomAbsolutePosition(parent,child);
		}

		return [leftPos,topPos];
	}

	//Container takes a DOM element as an object, not a jQuery object; 
	var createInitialTarget = function(container){
		var randomTarget = $("<img>");

		randomTarget.attr({
		"src":"./img/targets/duck_outline_target_brown.png",
		"alt":"Duck Outline Target Brown",
		"class": "duck-target",
		"id":"first-duck",
		"class":"duck"
		});


		var randomPosition = getRandomAbsolutePosition(container,randomTarget.get(0));

		var leftPos = randomPosition[0];
		var topPos = randomPosition[1];

		console.log("The left pos is: " + leftPos + ", the top position is: " + topPos);

		randomTarget.css({
			"position":"absolute",
			"top": topPos + "px",
			"left": leftPos + "px"
		});

		//Convert the DOM element to a jQuery object in order to add the random target to the container
		$(container).append(randomTarget);

		// setTimeout(function(){

		// 	randomTarget.remove();
		// },5000);

	};


	



	var isTargeting = false;

	//Convert the jQuery object to a DOM element
	var targetArea = $("#target-area").get(0);

	//Create the first duck object
	createInitialTarget(targetArea);

	
	$("#target-area").on("mouseenter",function(){
		isTargeting = true;
		console.log("Targeting on...");
	});

	$("#target-area").on("mouseleave",function(){
		isTargeting = false;
		console.log("Targeting off...");
	});


	var registerClickHandlers = function(){

		//Verify that the crosshair is in the DOM tree 

		//Get reference to the crosshair DOM element 

		var mainCrossHair = document.getElementById("main-crosshair");

		var targetArea = document.getElementById("target-area");

		var rect = mainCrossHair.getBoundingClientRect();
		var tRect = targetArea.getBoundingClientRect();

		$("#up").on('click','.option',function(e){
				console.log("Moving crosshair up...")

				var topPos = rect.top - tRect.top;

				console.log("The top position of the main cross hair is: " + topPos);

				mainCrossHair.style.top = (topPos - 10) + "px";

				console.log(mainCrossHair.onclick);

			});

		$("#down").on('click','.option',function(e){

				console.log("Moving crosshair up...")

				var topPos = rect.top - tRect.top;

				console.log("The top position of the main cross hair is: " + topPos);

				mainCrossHair.style.top = (topPos + 10) + "px";

				console.log(mainCrossHair.onclick);



			});

		$("#right").on('click','.option',function(e){

			
				console.log("Moving crosshair left...")

				var leftPos = rect.left - tRect.left;


				console.log("The left position of the main cross hair is: " + leftPos);


				mainCrossHair.style.left = (leftPos + 10) + "px";


				console.log(mainCrossHair.onclick);



			});

		$("#left").on('click','.option', function(e){


				console.log("Moving crosshair left...")

				var leftPos = rect.left - tRect.left;


				console.log("The left position of the main cross hair is: " + leftPos);


				mainCrossHair.style.left = (leftPos - 10) + "px";

				console.log(mainCrossHair.onclick);



			});

	}


	var isTargetingDuck = false;

	var targetedDucks = []

	var children = $("#target-area").children();
		
		$.each(children,function(index,duck){
			$(duck).on("mouseenter",function(){
				isTargetingDuck = true;
				targetedDucks.push(duck);
				console.log("Is targeting duck...");

			});

		});

		$.each(children,function(index,duck){
			$(duck).on("mouseleave",function(index,duck){
				isTargetingDuck = false;
				targetedDucks.pop(duck);
				console.log("Is not targeting duck...");
			})
		});


		var createExplosion = function(container, top,left){

			var expElement = $("<img>");
			expElement.css("position","absolute");

			container.append(expElement);
			container.css({
				"top": top + "px",
				"left": left + "px"
			});

			var i = 0;

			function frame(){
				switch(i){
					case 0:
						expElement.attr("src","./img/explosion/regularExplosion00.png");
						break;
					case 1:
						expElement.attr("src","./img/explosion/regularExplosion01.png");
						break;
					case 2:
						expElement.attr("src","./img/explosion/regularExplosion02.png");
						break;
					case 3:
						expElement.attr("src","./img/explosion/regularExplosion03.png");
						break;
					case 4:
						expElement.attr("src","./img/explosion/regularExplosion04.png");
						break;
					case 5:
						expElement.attr("src","./img/explosion/regularExplosion05.png");
						break;
					case 6:
						expElement.attr("src","./img/explosion/regularExplosion06.png");
						break;
					case 7:
						expElement.attr("src","./img/explosion/regularExplosion07.png");
						break;
					case 8:
						expElement.attr("src","./img/explosion/regularExplosion08.png");
						break;
				}

				i++;
			}

			setInterval(frame,100);

		}

		$("#target-area").on('click',function(e){

			if(isTargetingDuck == true){
				console.log("Fired on duck!");

				// $("#first-duck").remove();
				var rect = $(this).get(0).getBoundingClientRect();
				var targetedDuck = targetedDucks[0];
				var dRect = targetedDuck.getBoundingClientRect();

				$(targetedDuck).remove();
				console.log(e);
				createExplosion($(this),parseInt(dRect.top),parseInt(dRect.left));
			}
		});


	var createTargetAreaMouseMoveHandler = function(){


	

		$("#target-area").on('mousemove',function(e){


			console.log(e);

			var xPos = e.originalEvent.layerX;
			var yPos = e.originalEvent.layerY;


			var taWidth = e.target.clientWidth;
			var taHeight = e.target.clientHeight;



			console.log("The position of the crosshair (x,y) is: " + xPos + ", " + yPos);


			var location = {
				"top": yPos + "px",
				"left": xPos + "px"
			}


			var children = $(this).children('.duck');



		//var main_crosshair = document.getElementById("main-crosshair");


		$("#main-crosshair").css(location);


		$.each(children,function(index,duck){
			console.log("Duck info, index: " + index + ", with value: " + duck);

			var duckRect = duck.getBoundingClientRect();
			var dTop = duckRect.top;
			var dBottom = duckRect.bottom;
			var dRight = duckRect.right;
			var dLeft = duckRect.left;

			var main_crosshair = document.getElementById("main-crosshair");
			var cRect = main_crosshair.getBoundingClientRect();
			var cTop = cRect.top;
			var cBottom = cRect.bottom;
			var cLeft = cRect.left;
			var cRight = cRect.right;

			if(cTop > dTop && cBottom < dBottom && cLeft > dLeft && cRight < dRight){
				console.log("The crosshair is on the duck...");
			} else {
				console.log("The crosshair is not on the duck...");
			}


			console.log("Crosshair Top: " + cTop + ", Crosshair Bottom: " + cBottom + ", Crosshair Left: " + cLeft + ", Crosshair Right: " + cRight);

			console.log("Duck Top: " + dTop + ", Duck Bottom: " + dBottom + ", Duck Left: " + dLeft + ", Duck Right: " + dRight);

		});

		var main_crosshair = $("#main-crosshair").detach();

		if(main_crosshair){

		
		// main_crosshair.style.left = xPos + "px";
		// main_crosshair.style.top = yPos + "px";


			$(this).append(main_crosshair);




		}

		// $("#main-crosshair").css(location);



	});
	
	}

	createTargetAreaMouseMoveHandler();

	
});