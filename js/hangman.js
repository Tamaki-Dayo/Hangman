//Set Variables
const words = [
  "maiya",
  "geroge",
  "scaly",
  "fortnite",
  "debt",
  "pogcrazy",
  "wisp",
  "morbius",
  "amongus",
  "crocs",
  "british",
  "akshually",
  "rizzlin",
  "offline",
  "nejibot",
  "pizzatime"
]
let answer =''
let life = 6
let guessed = []
let wordStatus = null

// Get DOM elements
let keyboard = document.getElementById('keyboard')
let wordDisplay = document.getElementById('wordDisplay')
let hpDisplay = document.getElementById('hpDisplay')

// Generate Guess Buttons
function generateGuessButtons() {
  //Create Buttons
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'. split('').map(letter => 
    `
      <button class="m-2" 
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
       ` + letter + `
      </button>
    `).join('');
  
  // Set Buttons
  keyboard.innerHTML = buttonsHTML;
}
  
//Casing
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

  // Initialise Word
  function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)].toLowerCase();
  }
  // Word Status
  function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _")).join('')
    wordDisplay.innerHTML = toTitleCase(wordStatus);
  }

  // Handle Guess
  function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if(answer.indexOf(chosenLetter) >=0) {
      guessedWord()
      checkIfGameWon();
    } else if(answer.indexOf(chosenLetter) === -1) {
      life--;
      updateLife();
      checkIfGameLost();
    }
  }
  
  // Check Game Status
  function checkIfGameWon(){
    if(wordStatus === answer) {
      keyboard.innerHTML = 'You Won!!!';
    }
  }
  function checkIfGameLost(){
    if(life === 0) {
      wordDisplay.innerHTML = 'The answer was: ' + toTitleCase(answer);
      keyboard.innerHTML = 'You Lost!!!';
    }
  }

  // Update Life
  function updateLife() {
    hpDisplay.innerHTML = life;
  }

  generateGuessButtons();
  randomWord();
  guessedWord();


// Reset
function reset() {
  life = 6;
  guessed = [];
  
  randomWord();
  guessedWord();
  updateLife();
  generateGuessButtons();
}


document.getElementById('hpDisplay').innerHTML = life