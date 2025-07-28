const userImput = document.getElementById('boardSize');

const gameBoard = document.getElementById('gameboard');

handleChange();

//looks if thers a hcange in the dropdown menu
userImput.addEventListener('change', handleChange);



function handleChange() {

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
        height = 3;

        cards = new Array(length * height);


    } else if (selectedValue == "large") {

        gameBoard.style.gridTemplateColumns = "repeat(7, 1fr)";
        gameBoard.style.maxWidth = "400px";

        length = 7;
        height = 4;

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
        "🐓", "🪼", "🍎"];

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

    for (let i = 0; i < cards.length; i++) {

        cards[i].addEventListener('click', function () {
            const clickedCard = cards[i]
            console.log(clickedCard.matchPair);
            clickedCard.textContent = clickedCard.matchPair;

        });


    }
}

