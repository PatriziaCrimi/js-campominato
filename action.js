/* ASSIGNMENT
Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
Dopodiché, il programma deve chiedere all'utente un numero alla volta
e verificare se il numero indicato dall'utente è una mina oppure no.
Se l'utente becca una mina, il gioco finisce,
mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.
BONUS (facoltativo): all'inizio del gioco, il programma chiede all'utente il livello di difficoltà:
0 = l'intervallo di numeri possibili è tra 1 e 100
1 = l'intervallo di numeri possibili è tra 1 e 80
2 = l'intervallo di numeri possibili è tra 1 e 50
In ogni caso, le mine sono sempre 16.
BONUS 2 (facoltativo): l'utente deve inserire un numero compreso tra 1 e 100, oppure 1 e 80, oppure 1 e 50 a seconda del livello di difficoltà selezionato.
*/

// Initialization of variables and constants
const mines_quantity = 16;
const minimum_number = 1;
var mines_array = [];
var player_numbers_array = [];
var player_name = prompt('PLAYER 1. Please enter your name.');


// ************ Selecting Game Difficulty Level ************
do {
  // Player's choice
  var game_difficulty = parseInt(prompt('Please select the game difficulty level. Enter \'0\', \'1\', or \'2\'.'));
} while (game_difficulty !== 0 && game_difficulty !== 1 && game_difficulty !== 2);
console.log('You chose LEVEL ' + game_difficulty + '.');
console.log('');

// Game difficulty settings
if (game_difficulty === 2) {
  var maximum_number = 50;
} else if (game_difficulty) {   // --> game difficulty === 1
  maximum_number = 80;
} else if (!game_difficulty) {  // --> game difficulty === 0
  maximum_number = 100;
}

// Victory: calculating the maximum number of attempts
var maximum_attempts = maximum_number - mines_quantity;
console.log('Your maximum number of attempts is: ' + maximum_attempts + '.');
console.log('');


// ************ Generating the mines ************
while (mines_array.length < mines_quantity) {
  // Generating random numbers (the mines)
  var new_mine = getRndInteger(minimum_number, maximum_number);
  // Check if the new mine is equal to any existing mine --> then discard it
  if (!mines_array.includes(new_mine)) {
    // Storing the new mine into the mines array
    mines_array.push(new_mine);
  }
}
console.log('The array containing the mines is: ' , mines_array);
console.log('');


// ********************* Game *********************
// Check if the player number is a mine: mine found ends the game
var isMineExploded = false;
do {
  // Player's guess: he/she chooses a number
  var player_number = parseFloat(prompt('Enter a number ranging from ' + minimum_number + ' to ' + maximum_number + '.'));
  console.log('The number you entered is: ' + player_number + '.');

  // Check if player number is ranging from minimum number to maximum number
  if (player_number >= minimum_number && player_number <= maximum_number) {
    // Check player number is not a mine (not in the mines array)
    var isGameOver = isMineFound(player_number, mines_array); // --> function
    if (isGameOver) {
      isMineExploded = true;
      console.log('You found a mine. You lose!');
      console.log('You scored: ' + player_numbers_array.length + '.');
      alert('You found a mine. You lose! You scored: ' + player_numbers_array.length + '.');
      document.getElementById('loser').innerHTML = 'You found a mine. You lose!';
      document.getElementById('mine-found').innerHTML = player_number;
      document.getElementById('score').innerHTML = player_numbers_array.length;
      // Check player number has not already been chosen (not in player numbers array)
    } else if (player_numbers_array.includes(player_number)) {
      alert('ERROR. The value you entered is invalid. You had already entered this number.');
    } else {
      // Storing the player number in an array
      player_numbers_array.push(player_number);
      // Victory: the player used the maximum number of attempts (no mines found)
      if (player_numbers_array.length === maximum_attempts) {
        console.log('You won! You scored: ' + player_numbers_array.length + '.');
        alert('You won! You scored: ' + player_numbers_array.length + '.');
        document.getElementById('winner').innerHTML = 'Congratulations! You won!';
        document.getElementById('mine-found').innerHTML = 'no mines found!';
        document.getElementById('score').innerHTML = player_numbers_array.length;
      } else {
        alert('Well done! No mines found. Go ahead!');
      }
    }
  } else {
    console.log('ERROR. The value you entered is invalid. Please try again.');
    alert('ERROR. The value you entered is invalid. Please try again.');
  }
} while (!isMineExploded && player_numbers_array.length < maximum_attempts);

console.log('The array containing the player numbers is: ' , player_numbers_array);


// ---------------------- Creation of functions ----------------------

// FUNCTION: Get random number
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// FUNCTION: Check if mine is found
function isMineFound(playerGuess, minesField) {
  var isMine = false;
  if (minesField.includes(playerGuess)) {
    isMine = true;
  }
  return isMine;
}


// ---------------------- Print output in HTML ----------------------
console.log('');
console.log('----------- Print output in HTML -----------');

// Print player name
var print_player_name = document.getElementsByClassName('player-name');
console.log(print_player_name);
for (var i = 0; i < print_player_name.length; i++) {
  print_player_name[i].innerHTML = player_name;
}

// Print game difficulty level
document.getElementById('difficulty-level').innerHTML = game_difficulty;
// Print number of maximum attempts
document.getElementById('maximum-attempts').innerHTML = maximum_attempts;
