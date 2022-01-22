//Globals
var currentTextInput;
var puzzelArrayData;
var squaresSelected = [];
// true = down, false = across
var downOrAcross = false;
const timer = document.getElementById('stopwatch');
const stopButton = document.getElementById('stop-button');
const startButton = document.getElementById('play-button');

//Loads the Crossword
function initializeScreen(){
	
	var puzzelTable = document.getElementById("puzzel");
	puzzelArrayData = preparePuzzelArray();
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
				var txtID = String('txt' + '_' + i + '_' + j);
				var rowcol = String(i) + String(j);
				var newColTxtID = getColTxt(i, j, colData, nextColData);
				var newRowTxtID = getRowTxt(i, j, rowData, nextRowData);
				cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onclick="highlightSquares(\''+
				 	rowcol + '\' , \'' + txtID + '\' ); updateDownOrAcross(); "onkeyup= "moveCursor(this, \'' + 
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
			console.log(i,j,newColTxtID);
		}
		else if(i != colData.length -2){
			if(colData[i+2] != 0 ){
				var newColTxtID = String('txt' + '_' + (i+2) + '_' + (j));
				console.log(i,j,newColTxtID);
			}

			else if(i != colData.length -3){
				if(colData[i+3] != 0){
					var newColTxtID = String('txt' + '_' + (i+3) + '_' + (j));
					console.log(i,j,newColTxtID);
				}
			}
		}
		else if(i == colData.length -2){
			if(nextColData[0] != 0){
				var newColTxtID = String('txt' + '_' + (0) + '_' + (j+1));
				console.log(i,j,newColTxtID);
			}
			else if(nextColData[1] != 0){
				var newColTxtID = String('txt' + '_' + (1) + '_' + (j+1));
				console.log(i,j,newColTxtID);
			}
		}
	}
	else if(i == colData.length -1){
		if(j < colData.length -1){
			if(nextColData[0] != 0){
				var newColTxtID = String('txt' + '_' + (0) + '_' + (j+1));
				console.log(i,j,newColTxtID);
			}
			else if(nextColData[1] != 0){
				var newColTxtID = String('txt' + '_' + (1) + '_' + (j+1));
				console.log(i,j,newColTxtID);
			}
		}
		else if(j == colData.length -1){
			if(nextColData[0] != 0){
				var newColTxtID = String('txt' + '_' + (i+1) + '_' + (0));
				console.log(i,j,newColTxtID);
			}
		}
		
	}
	else if(nextColData[1] != 0){
		var newColTxtID = String('txt' + '_' + (i) + '_' + (1));
		console.log(i,j,newColTxtID);

	}		
	else{
		var newColTxtID = String('txt' + '_' + (i) + '_' + (2));
		console.log(newColTxtID);
		}
	
	return newColTxtID;

}

//goes to the next square
function moveCursor(fromTextBox, newRowBox, newColBox){
	var length = fromTextBox.value.length;
	var maxLength = fromTextBox.getAttribute("maxLength");
	if(downOrAcross == false){
		if (length == maxLength){
			document.getElementById(newRowBox).focus();
		}
		rowcol = newRowBox[4] + newRowBox[6];
		highlightSquares(rowcol, newRowBox);

	}
	else if(downOrAcross == true){
		if (length == maxLength){
			document.getElementById(newColBox).focus();
		}
		rowcol = newColBox[4] + newColBox[6];
		highlightSquares(rowcol, newColBox);
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



var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
	console.log("start");
	startButton.style.right = "3000px";
	stopButton.style.right = "15px";

	console.log(stopButton.style.right);
	console.log(startButton.style.right);
  	if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
	
}
function stopTimer() {
	console.log("stop");
	stopButton.style.right = "3000px";
	startButton.style.right = "15px";
	console.log(stopButton.style.right);
	console.log(startButton.style.right);
  	if (stoptime == false) {
    stoptime = true;
  	}
}

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
/* 					switch(i+','+j){
					case('0,0'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_1\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
					case('0,1'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_2\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('0,2'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_3\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('0,3'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('0,4'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_1_0\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('1,0'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
					case('1,1'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('1,2'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('1,3'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('1,4'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('2,0'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('2,1'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('2,2'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('2,3'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('2,4'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('3,0'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('3,1'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('3,2'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('3,3'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('3,4'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('4,0'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('4,1'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('4,2'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('4,3'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
					case('4,4'):
						cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_1\') "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
						console.log('case 1:')
				}
*/
						
