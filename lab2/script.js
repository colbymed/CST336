var numberToGuess = Math.floor(Math.random() * 99) + 1;
var guessCount = 0; 
var win = 0 ;
var loss = 0 ;


var buttonElement = document.querySelector("button");
buttonElement.addEventListener("click", checkNumber);
var result = document.querySelector("#guess");
var current = document.querySelector("#currentGuesses");
var winTotal = document.querySelector("#winTotal");
var lossTotal = document.querySelector("#lossTotal");

function checkNumber() {
  let number = document.querySelector("input").value;
  if (number <= 99 && number >= 1) {
    if (number == numberToGuess) {
      result.className = "alert alert-success";
      result.innerHTML = `Congratulations! The number was ${number}`;
      
      current.innerHTML = "";
      winTotal.innerHTML = ++win;
      numberToGuess = Math.floor(Math.random() * 99) + 1;
      guessCount = 0;
    }
    else if (number < numberToGuess) {
      result.className = "alert alert-primary";
      result.innerHTML = `Your guess ${number} was too low`;
      current.innerHTML += " " + number;
      guessCount++;
    } 
    else {
      result.className = "alert alert-warning";
      result.innerHTML = `Your guess ${number} was too high`;
      current.innerHTML += " " + number;
      guessCount++;
    }
    if (guessCount == 7) {
      result.className = "alert alert-danger";
      result.innerHTML = `You lose. The correct number was: ${numberToGuess}`;
      
      current.innerHTML = "";
      lossTotal.innerHTML = ++loss;
      numberToGuess = Math.floor(Math.random() * 99) + 1;
      guessCount = 0;
    }
  } else {
    result.className = "alert alert-dark";
    result.innerHTML = "Guess is out of range! Try again";
  }
}