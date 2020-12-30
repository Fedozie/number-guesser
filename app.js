/*GAME FUNCTION:
    -Players must guess a number between a min and max.
    -Players get a certain amount of guesses.
    -Notify players of guesses remaining.
    -Notfiy players of the right answer if they localStorage.
    -Let players choose to play again.
*/

//GAME VALUES
let min = 1;
let max = 10;
let winningNum = getRandomNum(min,max);
let guessesLeft = 3;

//UI ELEMENTS
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

//ASSIGN UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === "play-again"){
        window.location.reload();
    }
})

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value); //Converted the value, the user entered into an integer
    console.log(guess);

    //Validate Input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    };

    //Check if won
    if(guess === winningNum){
        //Game Over - won

        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else{
        //Wrong number
        guessesLeft = guessesLeft - 1;

        if(guessesLeft === 0){
            //Game over - lost

           gameOver(false, `Game Over. YOU LOST! The correct number is ${winningNum}.`);
        }else{
            //Game continues - answer wrong

            //Change border to green to signify wrong answer
            guessInput.style.borderColor = "red";
            //Clear Input
            guessInput.value = '';
            //Set message to show user that they won
            setMessage(`${guess} is the wrong answer, you have ${guessesLeft} left, TRY AGAIN!`, 'red');
        }
    }
});

//Game over function
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = true;
    //Change border to green to signify winning
    guessInput.style.borderColor = "color";
    //Set message to show user that they won
    setMessage(msg, color);

    //Play again
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";
}

//Generate Winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max - min + 1)+ min);
}

//Set message function
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}