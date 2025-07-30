const userImput = document.getElementById('boardSize');

const gameBoard = document.getElementById('gameboard');

handleChange();

player1Score = 0;
player2Score = 0;
updateScore();




//looks if thers a hcange in the dropdown menu
userImput.addEventListener('change', handleChange);



function handleChange() {
    updatePlayerTurn(1);

    const selectedValue = userImput.value;


    resetCards();

    if (selectedValue == "small") {

        gameBoard.style.gridTemplateColumns = "repeat(3, 1fr)";
        gameBoard.style.maxWidth = "170px";

        length = 3;
        height = 2;

        cards = new Array(length * height);


    } else if (selectedValue == "medium") {

        gameBoard.style.gridTemplateColumns = "repeat(5, 1fr)";
        gameBoard.style.maxWidth = "280px";

        length = 5;
        height = 4;

        cards = new Array(length * height);


    } else if (selectedValue == "large") {

        gameBoard.style.gridTemplateColumns = "repeat(7, 1fr)";
        gameBoard.style.maxWidth = "400px";

        length = 7;
        height = 6;

        cards = new Array(length * height);

    }

    //creates all the cards and then puts them in a 2d array
    for (i = 0; i < length * height; i++) {
        cards[i] = createNewCard(i);
    }
    createPairs();
    playGame(cards);

}

function createNewCard(id) {
    const newCard = document.createElement('button');

    newCard.className = 'card';

    newCard.matchPair = null;
    newCard.id = id;
    newCard.flipped = false;


    gameBoard.appendChild(newCard);
    return newCard;
}

//resets the cards on the screen
function resetCards() {
    gameBoard.innerHTML = "";
}


function createPairs() {

    const emojiArray = ["🐸", "🦄", "👻",
        "🍕", "🎲", "🧠",
        "🚀", "🌈", "🦆",
        "🍄", "🚗", "🐢",
        "🐓", "🪼", "🍎",
        "🍔", "🍉", "🫐",
        "🎱", "🏀", "🏈",
        "🔮"];

    let totalCards = height * length;
    let numPairs = totalCards / 2;
    let pairs = Array(numPairs * 2);

    //determines what emojis are in the pairs
    for (i = 0; i < totalCards; i = i + 2) {
        const index = Math.floor(Math.random() * emojiArray.length);
        const randEmoji = emojiArray[index];
        emojiArray.splice(index, 1);
        pairs[i] = randEmoji;
        pairs[i + 1] = randEmoji;
    }

    //puts the emojis in the boxes
    for (let i = 0; i < cards.length; i++) {
        const index = Math.floor(Math.random() * pairs.length);
        const randPair = pairs[index];
        pairs.splice(index, 1);
        cards[i].matchPair = randPair;
    }


}

//shuffles an array
function shuffleArray(arrayToShuffle) {

    for (let i = arrayToShuffle.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));
        [arrayToShuffle[i], arrayToShuffle[k]] = [array[j], array[i]];
    }
    return array;
}

function playGame(cards) {


    playerTurn = 1;
    numOfCardsFlipped = 0;

    firstChoice = null;
    seccondChoice = null;

    lockGame = false;

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function () {
            if (lockGame) return;


            //takes the clicked cards
            const clickedCard = cards[i]

            //if thta card has already been clicked, do nothing
            if (clickedCard.flipped) return;


            //shows the emoji value on the screen
            clickedCard.textContent = clickedCard.matchPair;

            //counts how many flipped this turn
            numOfCardsFlipped++;


            //marks the card as flipped
            clickedCard.flipped = true;

            //if its the first move
            if (numOfCardsFlipped == 1) {
                firstChoice = clickedCard;

                //if its the seccond move
            } else if (numOfCardsFlipped == 2) {
                seccondChoice = clickedCard;

            }

            //if both cards are flipped
            if (numOfCardsFlipped == 2) {

                //if they are not correct
                if (firstChoice.matchPair != seccondChoice.matchPair) {
                    firstChoice.style.backgroundColor = "#fc4c66";
                    seccondChoice.style.backgroundColor = "#fc4c66";
                    firstChoice.classList.add("shake");
                    seccondChoice.classList.add("shake");


                    //makes it so no other cards can be clicked
                    lockGame = true;

                    setTimeout(() => {
                        firstChoice.classList.remove("shake");
                        seccondChoice.classList.remove("shake");

                        //clears the screen
                        firstChoice.textContent = "";
                        seccondChoice.textContent = "";
                        firstChoice.style.backgroundColor = "#f9f9f9";
                        seccondChoice.style.backgroundColor = "#f9f9f9";
                        lockGame = false;
                        firstChoice.flipped = false;
                        seccondChoice.flipped = false;

                        //changes Player Turn
                        playerTurn = (playerTurn % 2) + 1;
                        console.log(playerTurn);
                        updatePlayerTurn(playerTurn);


                    }, 1000);

                    //if the cards do match
                } else {


                    if (playerTurn == 1) {
                        player1Score++;
                        firstChoice.style.backgroundColor = "#faf869";
                        seccondChoice.style.backgroundColor = "#faf869";
                    } else {
                        player2Score++;
                        firstChoice.style.backgroundColor = "#69ddfa";
                        seccondChoice.style.backgroundColor = "#69ddfa";

                    }



                }
                numOfCardsFlipped = 0;
            }
            updateScore();
        });
    }
}


function updatePlayerTurn(turn) {
    const turnCard = document.getElementById('playerTurn');

    if (turn == 1) {
        turnCard.style.backgroundColor = "#fcf67e";
        turnCard.textContent = "It's Player 1's Turn"
    } else {
        turnCard.style.backgroundColor = "#89e3fa";
        turnCard.textContent = "It's Player 2's Turn"
    }
}

function updateScore() {

    const scoreCard1 = document.getElementById('player1Score');
    scoreCard1.textContent = "Player 1 Score: " + player1Score;

    const scoreCard2 = document.getElementById('player2Score');
    scoreCard2.textContent = "Player 2 Score: " + player2Score;


}