/*

The ColorPoint Game 

The ColorPoint Game is a matching/guessing game that allows the player to match the color on the display with the color
programmed into the keyboard arrow keys. A player will play against the computer for each of the three rounds and 
gain the maximum of 4 points per round. If the player matches the color displayed with the incorrect arrow key, the computer
with gain a negative point opposite of the player. The player can earn a total of 4 points and the computer can earn a total of  
-4 points per round. After each round, the colors and the arrow keys are randomized for enhanced game play. The option to 
restart the game is avaialbe at the end of the round.

*/


////   FUNCTION: TO BEGIN GAMEPLAY   ////

function gamePlay(){                        // game play function
	let canvas = document.getElementById("myCanvas"),   // calls HTML <canvas> for game play
		ctx = canvas.getContext("2d"),      // canvas context (ctx) controls; returns a "2d" object/representation of a 2d context on the canvas
		elemLeft = canvas.offsetLeft,       // returns # of pixels in upper left corner of parent element
		elemTop = canvas.offsetTop;         // returns distance of the element relative to top of the parent node 

	canvas.addEventListener("mousedown",function(event) {  // checks for mouseclick to call funciton for game restart
		let xVal = event.pageX - elemLeft, 
			yVal = event.pageY - elemTop;
		location.reload();
	},false);
	ctx.fillStyle = "#000000";                          // canvas context (ctx) controls fill with default
	ctx.font = "30px Arial";                            // font Arial
	ctx.strokeText("The ColorPoint Game", 0, 100);      // cxt.strokeText draws color onto the canvas by x & y coordinates

	ctx.fillStyle = "#58663f";                          // hex color selection
	ctx.fillRect(0, 0, 256, 256);                       // fill rectangle of specified size with color

	
	let arrowKeys = [37, 38, 39, 40];   // precoded arrow key assignment array; 37 = left; 38 = up; 39 = right; 40 = down
	let tempRandomCommand = changeCommand();  // assigning temporary random command to call change colors function



	////    FUNCTION: TO  CHANGE  COLORS    ////
                                            // randomizes the color selections

	function changeCommand(){
		if(document.getElementById('roundNum').innerHTML !== 0){        // when the round is not 0 (game is not over)
			let generateColor = ["GREEN","RED","BLUE","PURPLE"];        // use the color array to ...
			let randCommand = generateColor[Math.floor(Math.random() * generateColor.length)]; // generate random color from array
			document.getElementById('invite').innerHTML = randCommand;   // invitation to play and changing to random color
			//console.log(randCommand); //verifies text shown matches up with text returned from this function
			return randCommand;             // log/return random color
		}
	}


    ////     FUNCTION: TO CHANGE THE SCORE     //// 
                                        // use increment and decrement to change score 
	function changeScore(isUpOrDown){ 
		let scor = document.getElementById('score');
		let num = scor.innerHTML;
		if(isUpOrDown == "up"){         // when score is increased, increment
			num++;
		}else{                          // decrement if score is not increased
			num--;
		}
		scor.innerHTML = num;           // store the new score value 

    }


////   FUNCTION: TO RANDOMIZE THE ARROW KEY ASSIGNMENT   ////


	function changeKeys(){                  // arrow key function to randomize the arrow keys
		let newKeyArray = [37, 38, 39, 40];        // new array name for origional arrow key assignment (randomization prep)
		arrowKeys = [0,0,0,0];              // reset arrow key array for randomization
		for(let i = 0; i < 4; i++){         //  interate over array
            let getRandomFromArray = newKeyArray[Math.floor(Math.random() * newKeyArray.length)] 
                                            // sets available array elements to variable for random assignment
			arrowKeys[i]=getRandomFromArray;            // assigns arrowKeys array element to getRandomFromArray variable
			newKeyArray.splice(newKeyArray.indexOf(getRandomFromArray),1); // splice the array for randomization
		}
		//console.log("arrowKeys final: " + arrowKeys); // *******  verfying code & checking arrow key assignment for testing
	}



////    FUNCTION:  TO CHANGE THE ROUND     ////
                                           // function to change the round, reset score and call to changeKeys function
	function changeRound(whoWon){           // whoWon the round triggers this function and DOMs in HTML (below)
		let roundNumX = document.getElementById('roundNum').innerHTML;
		let winnerNum = document.getElementById(whoWon).innerHTML;
		let resetScor = document.getElementById('score').innerHTML;
		winnerNum ++;
		roundNumX ++;
		resetScor = 0;
		document.getElementById('roundNum').innerHTML = roundNumX;
		document.getElementById(whoWon).innerHTML = winnerNum;
		document.getElementById('score').innerHTML = resetScor;
		changeKeys();               		                    //change key combinations after round

	}



////    FUNCTION: TO CHANGE THE COLORS IN THE 2-D CAVNAS BOX    ////

	function changeColor(rColor){           // change box color
		ctx.fillStyle = rColor;             // context (ctx) code to fill the 2d object with the color
		ctx.fillRect(0, 0, 256, 256);       // recangle dimensions to fill
	}
    
    


    ////   FUNCTION: TO CHECK IF CORRECT COLOR(S) WAS GUESSED AND CALL TO CHANGE THE SCORE FUNCTION	  ////


	function checkIfRight(cColor){
		if(tempRandomCommand == cColor){
			changeScore("up");              // when correct, increase score and log message
			document.getElementById('invite').innerHTML = "Great guess. You are correct! "; // changes "Ready" to "Great guess.."
			                    //tempRandomCommand = setTimeout(changeCommand,500);  // *******  verifying code
			checkIfRoundOver();             // call to check if the round is over function
			setTimeout(function() {         // evaluates if the checkIfRight function for 500 milliseconds before log & randomization
				tempRandomCommand = changeCommand(); // randomize the colors
			}, 500);
			//console.log("right");       // ***** verifying code
		}else{
			changeScore("down");            // when guess is incorrect, decreases score & log message
			document.getElementById('invite').innerHTML = "Uh, try again. ";  // changes "Ready" to "Uh, try again"
            
                                        //**** tempRandomCommand = setTimeout(changeCommand, 500); // ***** verifying code
			checkIfRoundOver();             // call to check if the round is over function
			setTimeout(function() {         // evaluates if the checkIfRight function for 500 ms before log & randomization
				tempRandomCommand = changeCommand();  // randomize the colors
			}, 500);
			//console.log("wrong");   // ***** verifying code
        } 
        
    
	} //console.log("tempRandomCommand: " + tempRandomCommand); // ***** verifying code
    
    


    ////    FUNCTION: TO CHECK IF ROUND OVER / GAME OVER     ////

                                                            // once player or computer reach +/- 4 points, round changes
	function checkIfRoundOver(){        
		if(document.getElementById('score').innerHTML == 4){   // verify if player reached 4 points
			changeRound("player");
		}else if (document.getElementById('score').innerHTML == -4){  // verify if computer reached  -4 points
			changeRound("computer");
		}
		checkIfGameOver();          // call to game over function if the round is over & game over parameters met
	}




  ////    FUNCTION: TO CHECK IF GAME IS OVER, ANNOUNCE WINNER, and PLAY AGAIN OFFER     ////  
  
  
	function checkIfGameOver(){             // function to verify if game is over and to disply winner
        
		if(document.getElementById('roundNum').innerHTML > 3){  // only want 3 roungs; stops game if greater than 3 rounds
			document.getElementById('invite').innerHTML = "GAME OVER...";    // logs message ... after 501 milliseconds
			setTimeout(function() {                                          // 501 ms to log winner, player or computer
				let playr = document.getElementById('player').innerHTML;     // player variable tracking player score
				let comp = document.getElementById('computer').innerHTML;    // computer variable tracking computer score
				let whoWon;                                                  // winner variable tracking winner 
				if(playr > comp){                                            // condition: if playr score > comp; playr = whoWon
					document.getElementById('invite').innerHTML = "YOU WIN"; // invite id changed to "You Win" (DOM)
					whoWon = 'player';
				}else{
					document.getElementById('invite').innerHTML = "COMPUTER WINS";  // invite DOM reassignment
					whoWon = 'computer';                                    // if player score !> than computer, comp = whoWon (winner)
				}

            ////    RESETS THE ROUND TO 0     //// 
                
				let roundNumX = document.getElementById('roundNum').innerHTML;  // round assignment
				let winnerNum = document.getElementById(whoWon).innerHTML;      // winner assignment
				let resetScore = document.getElementById('score').innerHTML;    // score reset assignment
				winnerNum = 0;
				roundNumX = 0;
				resetScore = 0;
				document.getElementById('roundNum').innerHTML = roundNumX;      // reset
				document.getElementById(whoWon).innerHTML = winnerNum;          // reset
				document.getElementById('score').innerHTML = resetScore;        // reset
				arrowKeys = [];                                                 // sends to randomized arrowkey array
                
                
            ////    CLICK TO PLAY AGAIN REQUEST    ////  

                                                                // canvas context (ctx) controls & info
				ctx.clearRect(0,0,256,256);                     // clear the rectangle (grid) on canvas
				ctx.fillStyle = "#000000";                      // fillstyle default
				ctx.font = "30px Arial";                        // Arial font
				ctx.strokeText("Click to Play Again", 0, 100);  // draws text on the canvas at coordinates
			}, 501);                                            // 501 millisecs set for Timeout function
		}
	}



////     FUNCTION: GAME START & ARROW KEY COLOR ASSINGMENT CHANGE     ////

                                    // switch function with 4 cases (each color) to compare to change the colors

	function checkWhatKeyPressed(chek){   // function that calls the switch statement for color cases
		let tempColor;                    // select a variable to hold the temp color within the arrow keys
		let key_code= chek.keyCode;       // use of switch statement to compare different case conditions
		switch(key_code){                 // for each of the color elements in the array. When match, block code executed.
			case arrowKeys[0]:
				tempColor = "BLUE";       // blue color case
				changeColor(tempColor);
				checkIfRight(tempColor);
				break;
			case arrowKeys[1]:
				tempColor = "GREEN";        // green color case
				changeColor(tempColor);
				checkIfRight(tempColor);
				break;
			case arrowKeys[2]:
				tempColor = "RED";          // red color case
				changeColor(tempColor);
				checkIfRight(tempColor);
				break;
			case arrowKeys[3]:
				tempColor = "PURPLE";       // purple color case
				changeColor(tempColor);
				checkIfRight(tempColor);
				break;						
					}
	}

    document.onkeydown = checkWhatKeyPressed;    // document.onkeydown works when any key is pressed and is assigned to
                                                 // call the function checkWhatKeyPressed and start the switch cases (gameplay)
}