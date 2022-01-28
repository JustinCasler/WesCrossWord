//Globals
var currentTextInput;
var puzzelArrayData;
var squaresSelected = [];
var imageArray = ["url(number1.png)", "url(number2.png)", "url(number3.png)", "url(number4.png)", "url(number5.png)",
	"url(number6.png)", "url(number7.png)", "url(number8.png)", "url(number9.png)"]
var imageTextID = []
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
var puzzleChecked = false;

//Loads the Crossword
function initializeScreen(){
	var puzzelTable = document.getElementById("puzzel");
	puzzelArrayData = preparePuzzelArray();
	

	var clueArray = []
	clueArray = getClueArray(puzzelArrayData);
	console.log(clueArray);
	var downClues = clueArray[0];
	var acrossClues = clueArray[1];
	var availableSquares = getNextAvailableSquare();
	console.log(availableSquares);
	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		var row = puzzelTable.insertRow(-1);
		var rowData = puzzelArrayData[i]
		if (i < puzzelArrayData.length -1){
			var nextRowData = puzzelArrayData[i+1]
			var pastRowData = puzzelArrayData[i-1]
		}
		if (i == puzzelArrayData.length -1){
			var nextRowData = puzzelArrayData[0]
			var pastRowData = puzzelArrayData[i-1]
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
				console.log(downAcross);
				var txtID = String('txt' + '_' + i + '_' + j);
				var rowcol = String(i) + String(j);
				var newColTxtID = getColNext(i, j, availableSquares);
				var newRowTxtID = getRowNext(i, j, availableSquares);
				var pastRowTxtID = getPastRowTxt(i, j, availableSquares);
				var pastColTxtID = getPastColTxt(i, j, availableSquares);
				var currentTxtID = currentTextInput
				if(i == 0 || j == 0 || pastColTxtID[6] != txtID[6] || pastRowTxtID[4] != txtID[4]){
					cell.innerHTML = '<input type="text" class="numberedBox"  MaxLength="1" onKeyDown = "mappedInput(event)"; onKeyUp = "keyEvents(event, this, \'' + newRowTxtID + '\', \'' + newColTxtID + '\', \'' + pastRowTxtID+'\', \'' + pastColTxtID+'\', \'' + currentTxtID+'\')"; textInputID() onclick="highlightSquares(\''+
					rowcol + '\' , \'' + txtID + '\'); highlightClue(\'' + downAcross + '\'); updateDownOrAcross(); "style="text-transform: uppercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ');  updateDownOrAcross(); highlightClue(\'' + downAcross + '\'); highlightSquares(\''+
					rowcol + '\' , \'' + txtID + '\');">';
					imageTextID.push(txtID)
					assignImage(txtID)
					console.log('imageTextID: ', imageTextID)
				}
				else{
				cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onKeyDown = "mappedInput(event)"; onKeyUp = "keyEvents(event, this, \'' + newRowTxtID + '\', \'' + newColTxtID + '\', \'' + pastRowTxtID+'\', \'' + pastColTxtID+'\', \'' + currentTxtID+'\')"; textInputID() onclick="highlightSquares(\''+
				rowcol + '\' , \'' + txtID + '\'); highlightClue(\'' + downAcross + '\'); updateDownOrAcross(); "style="text-transform: uppercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ');  updateDownOrAcross(); highlightClue(\'' + downAcross + '\'); highlightSquares(\''+
				rowcol + '\' , \'' + txtID + '\');">';
				}
			}
			else{
				cell.style.background = "black";
			}	
		}
		
	}
	startTimer();
	// addHint();
	
}

//get the last row
function getPastRowTxt(i, j, availableSquares){
	current = (i * puzzelArrayData.length) + j;
	acrossSquares = availableSquares[1];
	number = 0;
	for (var k = 1; k < acrossSquares.length; k++){
		if(acrossSquares[current - k] == 1){
			number = current - k;
			break;
		}
	}
	var row = Math.floor(number / puzzelArrayData.length);
	var col = number % puzzelArrayData.length;
	var textID = String('txt' + '_' + row + '_' + col);
	console.log('past text box: ', textID)
	return textID;
}

//get the next Row
function getRowNext(i, j, availableSquares){
	current = (i * puzzelArrayData.length) + j;
	acrossSquares = availableSquares[1];
	number = 0;
	for (var k = 1; k < acrossSquares.length; k++){
		if(acrossSquares[current + k] == 1){
			number = current + k;
			break;
		}
		else if(current+k == acrossSquares.length){
			number = 0;
			for (var l = 0; l < acrossSquares.length; l++){
				if(acrossSquares[l] == 1){
					number = l;
					break;
				}
			}
		}
	}
	
	var row = Math.floor(number / puzzelArrayData.length);
	var col = number % puzzelArrayData.length;
	var textID = String('txt' + '_' + row + '_' + col);
	return textID;
}
//get last columb 
function getPastColTxt(i, j, availableSquares){
	current = (j * puzzelArrayData.length) + i;
	downSquares = availableSquares[0];
	console
	number = 0;
	for (var k = 1; k < downSquares.length; k++){
		if(downSquares[current - k] == 1){
			number = current - k;
			console.log(number);
			break;
		}
	}
	var col = Math.floor(number / puzzelArrayData.length);
	var row = number % puzzelArrayData.length;
	var textID = String('txt' + '_' + row + '_' + col);
	console.log(textID);
	return textID;
}

//get the next column
function getColNext(i, j, availableSquares){
	current = (j * puzzelArrayData.length) + i;
	downSquares = availableSquares[0];
	console
	number = 0;
	for (var k = 1; k < downSquares.length; k++){
		if(downSquares[current + k] == 1){
			number = current + k;
			console.log(number);
			break;
		}
		else if(current+k == downSquares.length){
			number = 0;
			for (var l = 0; l < downSquares.length; l++){
				if(downSquares[l] == 1){
					number = l;
					break;
				}
			}
		}
	}
	var col = Math.floor(number / puzzelArrayData.length);
	var row = number % puzzelArrayData.length;
	var textID = String('txt' + '_' + row + '_' + col);
	console.log(textID);
	return textID;

}
// setting up to call function based on key input
function keyEvents(event, fromTextBox, newRowBox, newColBox , lastRowBox, lastColBox, currentTxtID) {
	if (event.keyCode >= 65 && event.keyCode <= 90){
    console.log("input was a-z")
	moveCursor(fromTextBox, newRowBox, newColBox);
	numberOfLetters ++
	trackLetter()
	}
	switch (event.key) {
		case "ArrowDown":
			console.log("ArrowDown");
			moveCursorIfBlank(event, this, newRowBox ,  newColBox, lastRowBox, lastColBox)
		break;
		case "ArrowUp":
			console.log("ArrowUp");
			moveCursorIfBlank(event, this, newRowBox ,  newColBox, lastRowBox, lastColBox)
		break;
		case "ArrowLeft":
			console.log("ArrowLeft");
			moveCursorIfBlank(event, this, newRowBox ,  newColBox, lastRowBox, lastColBox)
		break;
		case "ArrowRight":
			console.log("ArrowRight");
			moveCursorIfBlank(event, this, newRowBox ,  newColBox, lastRowBox, lastColBox)
		break;
		case "Backspace":
			console.log('Backspace')
			moveCursorIfBlank(event, this, newRowBox ,  newColBox, lastRowBox, lastColBox)
			
		break
		default:
			console.log(event.key, event.keyCode);
		return; 
	}
	event.preventDefault();
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
		console.log(downAcross);
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
		console.log(downAcross);
		highlightSquares(rowcol, newColBox);
		highlightClue(downAcross);
	}
	updateDownOrAcross();
	
}
// duplicate moveCursor for arrow and backspace
function moveCursorIfBlank(event, fromTextBox, newRowBox, newColBox, lastRowBox, lastColBox){
	// statements to switch highlight on 1 arrow press
	if(downOrAcross == true && event.keyCode == 39){
		if(newRowBox[4] == currentTextInput[4]){
		rowcol = newRowBox[4] + newRowBox[6];
		highlightSquares(rowcol, currentTextInput);
		}
	}
	else if(downOrAcross == true && event.keyCode == 37){
		if(lastRowBox[4] == currentTextInput[4]){
		rowcol = lastRowBox[4] + lastRowBox[6];
		highlightSquares(rowcol, currentTextInput)
		}
	}
	if(downOrAcross == false && event.keyCode == 40){
		if(newColBox[6] == currentTextInput[6]){
		rowcol = newColBox[4] + newColBox[6];
		highlightSquares(rowcol, currentTextInput);
		}
	}
	else if(downOrAcross == false && event.keyCode == 38){
		if(lastColBox[6] == currentTextInput[6]){
		rowcol = lastColBox[4] + lastColBox[6];
		highlightSquares(rowcol, currentTextInput);
		}
	}

	if(downOrAcross == false){
		if (event.keyCode == 39){
			console.log('working right')
			document.getElementById(newRowBox).focus();
			rowcol = newRowBox[4] + newRowBox[6];
			highlightSquares(rowcol, newRowBox);
			
		}
		else if (event.keyCode == 37){
			console.log('working left')
			document.getElementById(lastRowBox).focus();
			rowcol = lastRowBox[4] + lastRowBox[6];
			highlightSquares(rowcol, lastRowBox)
			
		}
		else if (binaryPuzzel[currentTextInput[4]][currentTextInput[6]] == 0){
			console.log('case 1')
			if(event.keyCode == 8){
				document.getElementById(lastRowBox).focus();
				rowcol = lastRowBox[4] + lastRowBox[6];
				console.log('case 2')
				highlightSquares(rowcol, lastRowBox)
		}}
		else if(event.keyCode == 8){
			binaryPuzzel[currentTextInput[4]][currentTextInput[6]] = 0
			updateDownOrAcross()
			numberOfLetters --
		}
	}
	else if(downOrAcross == true){
		if (event.keyCode == 40){
			console.log('working down')
			document.getElementById(newColBox).focus();
			rowcol = newColBox[4] + newColBox[6];
			highlightSquares(rowcol, newColBox);
		}
		else if (event.keyCode == 38){
			console.log('working up')
			document.getElementById(lastColBox).focus();
			rowcol = lastColBox[4] + lastColBox[6];
			highlightSquares(rowcol, lastColBox);
		}
		else if (binaryPuzzel[currentTextInput[4]][currentTextInput[6]] == 0){
			console.log('case 3')
			if(event.keyCode == 8){
				document.getElementById(lastColBox).focus();
				rowcol = lastColBox[4] + lastColBox[6];
				console.log('case 4');
				highlightSquares(rowcol, lastColBox);
		}}
		else if(event.keyCode == 8){
			binaryPuzzel[currentTextInput[4]][currentTextInput[6]] = 0;
			updateDownOrAcross();
			numberOfLetters --;
		}
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

// for delete button to know if current input is empty
binaryPuzzel = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
]
function mappedInput(event){
	if (event.keyCode >= 65 && event.keyCode <= 90){
	rowI = currentTextInput[4]
	colI = currentTextInput[6]
	binaryPuzzel[rowI][colI] = 1
	console.log(binaryPuzzel)
	}
}

//Returns Array
function preparePuzzelArray(){
	var items2 = [
				['f', 'o', 's', 's', '0'],
				['u', 'n', 'i', 't', '0'],
				['r', 'e', 'r', 'u', 'n'],
				['0', 'd', 'e', 'n', 'y'],
				['0', 'r', 'n', 's', 'c'],
			];
	var items = [
		['0', 's', 'h', 'e', '0'],
		['t', 'h', 'a', 't', 's'],
		['t', 'o', 't', 'e', 's'],
		['s', 'w', 'e', 'a', 't'],
		['0', 's', 'r', 's', '0'],
	];

	var items3 = [
		['0', '0', '0', 'n', 'u', 'd', 'e'],
		['0', '0', 'b', 'o', 'n', 'u', 's'],
		['0', 'd', 'o', 'o', 'w', 'o', 'p'],
		['c', 'o', 'n', 'd', 'e', 'm', 'n'],
		['a', 'p', 'o', 'l', 'l', 'o', '0'],
		['r', 'e', 'b', 'e', 'l', '0', '0'],
		['e', 'r', 'o', 's', '0', '0', '0'],
	];

return items2;
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
			if (box.classList.contains('numberedBox')){
				for(i = 0; i <= imageTextID.length; i++){
					if(imageTextID[i] == squaresSelected[t]){
						box.style.background = "none";
						box.style.backgroundImage = imageArray[i];
						box.style.zIndex = "5";
						box.style.position = "left";
						box.style.backgroundSize = "12px";
						box.style.backgroundRepeat = "no-repeat";
					}
				}
			}
			else{
				box.style.background = "none";
			}
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
				if (selectedSquare.classList.contains('numberedBox')){
					for(i = 0; i <= imageTextID.length; i++){
						if(imageTextID[i] == txtID){
							console.log('imageTextID[i]: ', imageTextID[i] +' i: ', i+1)
							selectedSquare.style.background = "#b3f1ff";
							selectedSquare.style.backgroundImage = imageArray[i];
							selectedSquare.style.zIndex = "5";
							selectedSquare.style.position = "left";
							selectedSquare.style.backgroundSize = "12px";
							selectedSquare.style.backgroundRepeat = "no-repeat";
						}
					}
				}
				else{
					selectedSquare.style.background = "#b3f1ff";
				}
				squaresSelected.push(txtID);
			}

		}
	}
	else if(downOrAcross == false){
		for(var l = 0; l < colData.length; l++){
			if (colData[l] != 0){
				var txtID = String('txt' + '_' + l + '_' + col)
				var selectedSquare = document.getElementById(txtID);
				if (selectedSquare.classList.contains('numberedBox')){
					for(i = 0; i <= imageTextID.length; i++){
						if(imageTextID[i] == txtID){
							selectedSquare.style.background = "#b3f1ff";
							selectedSquare.style.backgroundImage = imageArray[i];
							selectedSquare.style.zIndex = "5";
							selectedSquare.style.position = "left";
							selectedSquare.style.backgroundSize = "12px";
							selectedSquare.style.backgroundRepeat = "no-repeat";
						}
					}
				}
				else{
					selectedSquare.style.background = "#b3f1ff";
				}
				squaresSelected.push(txtID);
			}

		}


	}
	var selectedSquare = document.getElementById(squareID);
	if (selectedSquare.classList.contains('numberedBox')){
		for(i = 0; i <= imageTextID.length; i++){
			if(imageTextID[i] == squareID){
				selectedSquare.style.background = "#FFCA55";
				selectedSquare.style.backgroundImage = imageArray[i];
				selectedSquare.style.zIndex = "5";
				selectedSquare.style.position = "left";
				selectedSquare.style.backgroundSize = "12px";
				selectedSquare.style.backgroundRepeat = "no-repeat";
			}
		}
	}
	else{
		selectedSquare.style.background = "#FFCA55";
	}
}

//puts the correct numbers in the top left courner
counter = 0
function assignImage(squareID){
	var imageCell = document.getElementById(squareID)
	var imageUrl = "url(number1.png)"
	imageCell.style.backgroundImage = imageArray[counter]
	counter ++
}

//highlight the clue
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
	console.log(downOrAcross);
	if (downOrAcross != true){
		downClue.style.background = "#FFCA55";
		downClue.style.border = "2px solid #FFCA55";
		acrossClue.style.border = "2px solid #FF5C5C";
		clueSelected.push(downID);
		clueSelected.push(acrossID);
		clueText = downClue.innerHTML
		
		document.getElementById("clue-text").innerHTML = clueText;
		if (clueText.length > 30){
			document.getElementById("clue-text").style.fontSize = "15px";

		}
	}
	else{
		downClue.style.border = "2px solid #FF5C5C";
		acrossClue.style.background = "#FFCA55";
		acrossClue.style.border = "2px solid #FFCA55";
		clueSelected.push(downID);
		clueSelected.push(acrossID);
		clueText = acrossClue.innerHTML
		document.getElementById("clue-text").innerHTML = clueText;
		if (clueText.length > 30){
			var fontSizeDifference = String(19 - (Math.floor((clueText.length - 30) / 4)));

			document.getElementById("clue-text").style.fontSize = fontSizeDifference + "px";

		}
	}
}

//get next available square
function getNextAvailableSquare(){
	var fullPuzzle = preparePuzzelArray();
	var nextAvailableSquareAcross = [];
	var nextAvailableSquareDown = [];
	for(i = 0; i < fullPuzzle.length; i++){
		for(j = 0; j < fullPuzzle[i].length; j++){
			if(fullPuzzle[i][j] == 0){
				nextAvailableSquareAcross.push(0);
			}
			else{
				nextAvailableSquareAcross.push(1);
			}
		}
	}
	for(i = 0; i < fullPuzzle.length; i++){
		for(j = 0; j < fullPuzzle[i].length; j++){
			if(fullPuzzle[j][i] == 0){
				nextAvailableSquareDown.push(0);			
			}
			else{
				nextAvailableSquareDown.push(1);
			}
		}
	}
	var nextAvailableSquare = [];
	nextAvailableSquare.push(nextAvailableSquareDown);
	nextAvailableSquare.push(nextAvailableSquareAcross);
	return nextAvailableSquare;
}
//Check on completion 
numberOfLetters = 0
function trackLetter(){
	var availableSquares = getNextAvailableSquare()
	tracker = 0
	for(i =0; i < availableSquares[0].length; i++){
		if(availableSquares[0][i] == 1){
			tracker ++;
		}
	}
	if(numberOfLetters == tracker){
		autoCheck();
	}
}


//checkpuzzle if the puzzle is completed
function autoCheck(){
	var breaker = false;
	var squaresList = [];
	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		if(breaker == true){
			break;
		}
		var rowData = puzzelArrayData[i];
		for(var j = 0 ; j < rowData.length ; j++){
			if(rowData[j] != 0){
				var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
				
				if(selectedInputTextElement.value == puzzelArrayData[i][j]){
					id = ('txt' + '_' + i + '_' + j)
					squaresList.push(id);
					
				}
				else{
					var text = document.getElementById('completion-text');
					text.style.left = "450px";
					breaker = true;
				}

			}
		}
	}
	if(breaker == true){
		return;
	}
	stopTimer();
	var time = document.getElementById('stopwatch');
	var text = document.getElementById('completion-text');
	var timeText = time.innerHTML;
	text.style.left = "450px";
	text.style.background = "#b3f1ff";
	text.innerHTML = "Puzzle Completed!" + "Time: " + timeText;
	if(puzzleChecked == true){
		text.style.color = "#0066ff";
	}
	for(i = 0; i < squaresList.length; i++){
		var box = document.getElementById(squaresList[i]);
		box.style.pointerEvents = "none";
		box.style.color = "#0066ff";
		box.style.border = "1px solid #000000";
	}
}







//Check button
function checkClicked(){
	puzzleChecked = true;
	var timer = document.getElementById('stopwatch');
	timer.style.color = "#0066ff";
	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		var rowData = puzzelArrayData[i];
		for(var j = 0 ; j < rowData.length ; j++){
			if(rowData[j] != 0){
				var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
					if(selectedInputTextElement.value != puzzelArrayData[i][j] && selectedInputTextElement.value != ''){
						selectedInputTextElement.style.backgroundColor = "#ff8686";
					}
					else if(selectedInputTextElement.value != ''){
						selectedInputTextElement.style.color = "#0066ff";
						selectedInputTextElement.style.border = "1px solid #000000";
						selectedInputTextElement.style.pointerEvents = "none";
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
	}
}
//Solve Button
function solveClicked(){
	puzzleChecked = true;
	var timer = document.getElementById('stopwatch');
	timer.style.color = "#0066ff";
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