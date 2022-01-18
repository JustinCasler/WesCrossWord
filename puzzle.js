//Globals
var currentTextInput;
var puzzelArrayData;

//Loads the Crossword
function initializeScreen(){
	var puzzelTable = document.getElementById("puzzel");
	puzzelArrayData = preparePuzzelArray();

	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		var row = puzzelTable.insertRow(-1);
		var rowData = puzzelArrayData[i];
		for(var j = 0 ; j < rowData.length ; j++){
			var cell = row.insertCell(-1);
			if(rowData[j] != 0){
				var txtID = String('txt' + '_' + i + '_' + j);
				
				if(i == 0 && j ==0)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_1\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 0 && j == 1)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_2\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 0 && j == 2)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_3\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 0 && j == 3)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_0_4\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 0 && j == 4)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_1_0\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 1 && j == 0)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_1_1\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 1 && j == 1)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_1_2\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 1 && j == 2)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_1_3\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 1 && j == 3)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_1_4\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 1 && j == 4)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_2_0\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 2 && j == 0)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_2_1\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 2 && j == 1)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_2_2\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 2 && j == 2)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_2_3\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 2 && j == 3)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_2_4\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 2 && j == 4)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_3_0\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 3 && j == 0)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_3_1\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 3 && j == 1)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_3_2\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 3 && j == 2)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_3_3\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 3 && j == 3)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_3_4\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 3 && j == 4)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_4_0\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 4 && j == 0)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_4_1\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 4 && j == 1)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_4_2\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 4 && j == 2)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_4_3\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 4 && j == 3)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_4_4\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				else if(i == 4 && j == 4)
					cell.innerHTML = '<input type="text" class="inputBox" MaxLength="1" onkeyup= "moveCursor(this, \'txt_4_4\')" "style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
				}else{
				cell.style.backgroundColor  = "black";
			}
			
		}
	}
	addHint();
}
function moveCursor(fromTextBox, toTextBox){
	var length = fromTextBox.value.length;
	var maxLength = fromTextBox.getAttribute("maxLength");
	if (length == maxLength){
		document.getElementById(toTextBox).focus()
	}
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
var items = [	['j', 'h', 'y', 'd', 'e'],
				['j', 'h', 'y', 'd', 'e'],
				['j', 'h', 'y', 'd', 'e'],
				['j', 'h', 'y', 'd', 'e'],
				['j', 'h', 'y', 'd', 'e'],
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
//Check button
function checkClicked(){
	for ( var i = 0; i < puzzelArrayData.length ; i++ ) {
		var rowData = puzzelArrayData[i];
		for(var j = 0 ; j < rowData.length ; j++){
			if(rowData[j] != 0){
				var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
				if(selectedInputTextElement.value != puzzelArrayData[i][j]){
					selectedInputTextElement.style.backgroundColor = 'red';
					
				}else{
					selectedInputTextElement.style.backgroundColor = 'white';
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
						
