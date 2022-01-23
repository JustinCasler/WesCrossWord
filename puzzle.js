//Globals
var currentTextInput;
var puzzelArrayData;
var squaresSelected = [];
// true = down, false = across
var downOrAcross = false;
const timer = document.getElementById('stopwatch');
const stopButton = document.getElementById('stop-button');
const startButton = document.getElementById('play-button');
var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;
var clueSelected = [];

//Loads the Crossword
function initializeScreen(){
	var puzzelTable = document.getElementById("puzzel");
	puzzelArrayData = preparePuzzelArray();
	var clueArray = []
	clueArray = getClueArray(puzzelArrayData);
	var downClues = clueArray[0];
	var acrossClues = clueArray[1];

	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		var row = puzzelTable.insertRow(-1);
		var rowData = puzzelArrayData[i]
		if (i < puzzelArrayData.length -1){
			var nextRowData = puzzelArrayData[i+1]
		}
		if (i == puzzelArrayData.length -1){
			var nextRowData = puzzelArrayData[0]
		}
		for(var j = 0 ; j < rowData.length ; j++){
			var cell = row.insertCell(-1);
			if(rowData[j] != 0){
				var colData = [];
				var nextColData = [];
				if(j < rowData.length -1){
					for(var k = 0; k < rowData.length; k++){
					colData.push(puzzelArrayData[k][j]);
					nextColData.push(puzzelArrayData[k][j+1]);
					}
				}
				if(j == rowData.length -1){
					for(var k = 0; k < nextRowData.length; k++){
						colData.push(puzzelArrayData[k][j]);
						nextColData.push(puzzelArrayData[k][0]);
					}
				}
				var downClue = downClues[(i*rowData.length)+j];
				var acrossClue = acrossClues[(i*rowData.length)+j];
				var downAcross = String(downClue + ' ' + acrossClue);
				var txtID = String('txt' + '_' + i + '_' + j);
				var rowcol = String(i) + String(j);
				var newColTxtID = getColTxt(i, j, colData, nextColData);
				var newRowTxtID = getRowTxt(i, j, rowData, nextRowData);
				cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onclick="highlightSquares(\''+
				 	rowcol + '\' , \'' + txtID + '\'); updateDownOrAcross(); highlightClue(\'' + downAcross + '\');" onkeyup= "moveCursor(this, \'' + 
					newRowTxtID + '\', \'' + newColTxtID + '\')" "style="text-transform: lowercase" ' + 'id="' + 
					txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ '); updateDownOrAcross()">';
			}
			else{cell.style.background = "black";}	
		}
				
		
	}
	startTimer();
	addHint();
	
}


// get the next square across
function getRowTxt(i,j, rowData, nextRowData){
	if(j != rowData.length - 1){
		if(rowData[j+1] != 0) 
			var newRowTxtID = String('txt' + '_' + i + '_' + (j+1));
		else if(j != rowData.length - 2){
			if(rowData[j+2] != 0) 
				var newRowTxtID = String('txt' + '_' + i + '_' + (j+2));
		}
		else{ 
			if(nextRowData[0] != 0){
				var newRowTxtID = String('txt' + '_' + (i+1) + '_' + (0));
			}
			else if (nextRowData[1] != 0)
				var newRowTxtID = String('txt' + '_' + (i+1) + '_' + 1);
		}
	}	
	else if(j == rowData.length - 1){
		if(nextRowData[0] != 0){
			var newRowTxtID = String('txt' + '_' + (i+1) + '_' + 0);
		}
		else if(nextRowData[1] != 0){
			var newRowTxtID = String('txt' + '_' + (i+1) + '_' + 1);
		}
	}	
	return newRowTxtID;

}

// get the next square down
function getColTxt(i, j, colData, nextColData){
	if(i != colData.length -1){
		if(colData[i+1] != 0){
			var newColTxtID = String('txt' + '_' + (i+1) + '_' + (j));
		}
		else if(i != colData.length -2){
			if(colData[i+2] != 0 ){
				var newColTxtID = String('txt' + '_' + (i+2) + '_' + (j));
			}

			else if(i != colData.length -3){
				if(colData[i+3] != 0){
					var newColTxtID = String('txt' + '_' + (i+3) + '_' + (j));
				}
			}
		}
		else if(i == colData.length -2){
			if(nextColData[0] != 0){
				var newColTxtID = String('txt' + '_' + (0) + '_' + (j+1));
			}
			else if(nextColData[1] != 0){
				var newColTxtID = String('txt' + '_' + (1) + '_' + (j+1));
			}
		}
	}
	else if(i == colData.length -1){
		if(j < colData.length -1){
			if(nextColData[0] != 0){
				var newColTxtID = String('txt' + '_' + (0) + '_' + (j+1));
			}
			else if(nextColData[1] != 0){
				var newColTxtID = String('txt' + '_' + (1) + '_' + (j+1));
			}
		}
		else if(j == colData.length -1){
			if(nextColData[0] != 0){
				var newColTxtID = String('txt' + '_' + (i+1) + '_' + (0));
			}
		}
		
	}
	else if(nextColData[1] != 0){
		var newColTxtID = String('txt' + '_' + (i) + '_' + (1));
	}		
	else{
		var newColTxtID = String('txt' + '_' + (i) + '_' + (2));
		}
	return newColTxtID;
}

//goes to the next square
function moveCursor(fromTextBox, newRowBox, newColBox){
	puzzleArray = preparePuzzelArray();
	clueArray = getClueArray(puzzleArray);
	var newColClue = (parseInt(newColBox[4]) * puzzleArray.length) + parseInt(newColBox[6]);
	var newRowClue = (parseInt(newRowBox[4]) * puzzleArray.length) + parseInt(newRowBox[6]);

	var length = fromTextBox.value.length;
	var maxLength = fromTextBox.getAttribute("maxLength");
	if(downOrAcross == false){
		if (length == maxLength){
			document.getElementById(newRowBox).focus();
		}
		var downClue = clueArray[0][newRowClue];
		var acrossClue = clueArray[1][newRowClue];
		console.log(downClue, acrossClue);
		var downAcross = String(downClue + ' ' + acrossClue);
		var rowcol = newRowBox[4] + newRowBox[6];
		highlightSquares(rowcol, newRowBox);
		highlightClue(downAcross);

	}
	else if(downOrAcross == true){
		if (length == maxLength){
			document.getElementById(newColBox).focus();
		}
		var downClue = clueArray[0][newColClue];
		var acrossClue = clueArray[1][newColClue];
		var downAcross = String(downClue + ' ' + acrossClue);
		var rowcol = newColBox[4] + newColBox[6];
		highlightSquares(rowcol, newColBox);
		highlightClue(downAcross);
	}
	updateDownOrAcross();
	
}

// switches downOrAcross
function updateDownOrAcross(){
	if (downOrAcross == true){
		downOrAcross = false;
	}
	else{
		downOrAcross = true;
	}
	console.log(downOrAcross);
}

// clue pointer array
function getClueArray(board){
	var sideLength = board.length; 
	downclueArray = [];
	acrossclueArray = [];
	clueNumber = 0; 
	for (var i = 0; i < board.length; i++){
		for (var j = 0; j < board[i].length; j++){
			var tempClueNumber = clueNumber;
			if (board[i][j] == 0){
				downclueArray.push(0);
				acrossclueArray.push(0);
			}
			else{
				if(i == 0 || board[i-1][j] == 0){
					clueNumber++;
					downclueArray.push(clueNumber);
					if(j==0 || board[i][j-1] == 0){
						acrossclueArray.push(clueNumber);
					}
					else{
						var tempAcross = acrossclueArray[((i*sideLength) + j) - 1];
						acrossclueArray.push(tempAcross);
					}
				}
				else{
					var tempDown = downclueArray[((i*sideLength) + j) - sideLength];
					downclueArray.push(tempDown);
					if(j==0 || board[i][j-1] == 0){
						if(tempClueNumber == clueNumber){
							clueNumber++;
						}
						acrossclueArray.push(clueNumber);
					}
					else{
						var tempAcross = acrossclueArray[((i*sideLength) + j) - 1];
					acrossclueArray.push(tempAcross);

					}

				}
				
			}

			
		}
		bothArrays = [downclueArray, acrossclueArray];
	}
	return (bothArrays);


}

//Adds the hint numbers
function addHint(){
	document.getElementById("txt_0_4").placeholder = "1";
	document.getElementById("txt_2_6").placeholder = "2";
	document.getElementById("txt_3_1").placeholder = "3";
	document.getElementById("txt_3_9").placeholder = "4";
	document.getElementById("txt_6_2").placeholder = "5";
	document.getElementById("txt_9_0").placeholder = "6";
}
//Stores ID of the selected cell into currentTextInput
function textInputFocus(txtID123){
	currentTextInput = txtID123;
}
//Returns Array
function preparePuzzelArray(){
	var items = [['0', 's', 'h', 'e', '0'],
				['t', 'h', 'a', 't', 's'],
				['t', 'o', 't', 'e', 's'],
				['s', 'w', 'e', 'a', 't'],
				['0', 's', 'r', 's', '0'],
			];
return items;
}
//Clear All Button
function clearAllClicked(){
	currentTextInput = '';
	var puzzelTable = document.getElementById("puzzel");
	puzzelTable.innerHTML = '';
    initializeScreen();
}

//Highlight the selected squares and row/column
function highlightSquares(rowcol, squareID){
	if(squaresSelected.length != 0){
		for(t = 0; t < squaresSelected.length; t++){
			var box = document.getElementById(squaresSelected[t]);
			box.style.background = "none";
		}
		for(t = 0; t < squaresSelected.length; t++){
			squaresSelected.pop();
		}
		
	}
	var col = rowcol[1];
	var row = rowcol[0];
	var fullPuzzle = preparePuzzelArray();
	var rowData = fullPuzzle[row];
	var colData = [];
	for(var i = 0; i < rowData.length; i++){
		colData.push(fullPuzzle[i][col]);
	}
	if(downOrAcross == true){
		for(var l = 0; l < rowData.length; l++){
			if (rowData[l] != 0){
				var txtID = String('txt' + '_' + row + '_' + l)
				var selectedSquare = document.getElementById(txtID);
				selectedSquare.style.background = "#b3f1ff";
				squaresSelected.push(txtID);
			}

		}
	}
	else if(downOrAcross == false){
		for(var l = 0; l < colData.length; l++){
			if (colData[l] != 0){
				var txtID = String('txt' + '_' + l + '_' + col)
				var selectedSquare = document.getElementById(txtID);
				selectedSquare.style.background = "#b3f1ff";
				squaresSelected.push(txtID);
			}

		}


	}
	var selectedSquare = document.getElementById(squareID);
	selectedSquare.style.background = "#FFCA55";

}

function highlightClue(downAcross){
	var clues = downAcross.split(' ');
	acrossID = String("acrossClue"+clues[1])
	downID = String("downClue"+clues[0])
	downClue = document.getElementById(downID);
	acrossClue = document.getElementById(acrossID);
	
	
	if(clueSelected.length != 0){
		for (var i = 0; i < clueSelected.length; i++){
			var box = document.getElementById(clueSelected[i]);
			box.style.background = "none";
			box.style.border = "none";
		}
	}
	if (downOrAcross == true){
		downClue.style.background = "#FFCA55";
		acrossClue.style.border = "thick solid #FFCA55";
		clueSelected.push(downID);
		clueSelected.push(acrossID);
		clueText = downClue.innerHTML
		
		document.getElementById("clue-text").innerHTML = clueText;
		

	}
	else{
		downClue.style.border = "thick solid #FFCA55";
		acrossClue.style.background = "#FFCA55";
		clueSelected.push(downID);
		clueSelected.push(acrossID);
		clueText = acrossClue.innerHTML
		document.getElementById("clue-text").innerHTML = clueText;
	}
	
	


}

//Check button
function checkClicked(){
	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		var rowData = puzzelArrayData[i];
		for(var j = 0 ; j < rowData.length ; j++){
			if(rowData[j] != 0){
				var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
					if(selectedInputTextElement.value != puzzelArrayData[i][j] && selectedInputTextElement.value != ''){
						selectedInputTextElement.style.backgroundColor = "#ff8686";
					}
					else if(selectedInputTextElement.value != ''){
						selectedInputTextElement.style.backgroundColor = "#b3f1ff";
					}
					else{
						selectedInputTextElement.style.backgroundColor = "none";

					}

					
	
					
					
				
			}
		}
	}
}
//Clue Button
function clueClicked(){
	if (currentTextInput != null){
		var temp1 = currentTextInput;
		var token = temp1.split("_");
		var row = token[1];
		var column = token[2];
		document.getElementById(temp1).value = puzzelArrayData[row][column];
		//checkClicked();
	}
}
//Solve Button
function solveClicked(){
	if (currentTextInput != null){
		var temp1 = currentTextInput;
		var token = temp1.split("_");
		var row = token[1];
		var column = token[2];
		
		// Print elements on top
		for(j = row; j >= 0; j--){
			if(puzzelArrayData[j][column] != 0){
				document.getElementById('txt' + '_' + j + '_' + column).value = puzzelArrayData[j][column];
				}else break;
		}
		// Print elements on right
		for(i = column; i< puzzelArrayData[row].length; i++){
			if(puzzelArrayData[row][i] != 0){
				document.getElementById('txt' + '_' + row + '_' + i).value = puzzelArrayData[row][i];
				}else break;
		}
		
		// Print elements below
		for(m = row; m< puzzelArrayData.length; m++){
			if(puzzelArrayData[m][column] != 0){
				document.getElementById('txt' + '_' + m + '_' + column).value = puzzelArrayData[m][column];
				}else break;
		}
		// Print elements on left
		for(k = column; k >= 0; k--){
			if(puzzelArrayData[row][k] != 0){
				document.getElementById('txt' + '_' + row + '_' + k).value = puzzelArrayData[row][k];
				}else break;
		}
		// Done!
		
	}
}


// timer
// start timer
function startTimer() {
	console.log("start");
	startButton.style.right = "3000px";
	stopButton.style.right = "15px";
  	if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
	
}

// stop timer
function stopTimer() {
	console.log("stop");
	stopButton.style.right = "3000px";
	startButton.style.right = "15px";
  	if (stoptime == false) {
    stoptime = true;
  	}
}

// timer
function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);
    sec = sec + 1;
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }
    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }
    timer.innerHTML = hr + ':' + min + ':' + sec;
    setTimeout("timerCycle()", 1000);
  }
}

// reset timer
function resetTimer() {
    timer.innerHTML = '00:00:00';
}

/*side Menu*/	
function showMenu(){
	var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0px";
           }
function hideMenu(){
	var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
           }			