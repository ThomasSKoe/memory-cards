const userImput = document.getElementById('boardSize');

const gameBoard = document.getElementById('gameboard');

//looks if thers a hcange in the dropdown menu
userImput.addEventListener('change', handleChange);

//creates initial small grid with the array
let cards = new Array(6);
for (i = 0; i < 6; i++) {
    cards[i] = createNewCard(i);
}


//length of the sides of a gameboard grid
let length = 3;
//height if the grid
let height = 2;

createPairs();


function handleChange() {

    const selectedValue = userImput.value;


    resetCards();

    if (selectedValue == "small") {
        console.log("Small");


        gameBoard.style.gridTemplateColumns = "repeat(3, 1fr)";
        gameBoard.style.maxWidth = "170px";

        length = 3;
        height = 2;

        cards = new Array(length * height);


    } else if (selectedValue == "medium") {
        console.log("Medium");


        gameBoard.style.gridTemplateColumns = "repeat(5, 1fr)";
        gameBoard.style.maxWidth = "280px";

        length = 5;
        height = 3;

        cards = new Array(length * height);

    } else if (selectedValue == "large") {
        console.log("Large");


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

    console.log(cards.size);
}

function createNewCard(id) {
    const newCard = document.createElement('button');

    newCard.className = 'card';
    newCard.textContent = id;

    newCard.id = "id";

    gameBoard.appendChild(newCard);
    return newCard;
}

//resets the cards on the screen
function resetCards() {
    gameBoard.innerHTML = "";
}


function createPairs() {

    let totalCards = height * length;
    let numPairs = totalCards / 2;
    let pairs = Array(numPairs*2);

    for (i = 0; i < totalCards; i = i + 2) {
        pairs[i] = i;
        pairs[i+1] = i;
    }

    console.log(pairs);

}




//shuffles an array
function shuffleArray(arrayToShuffle) {

    for (let i = arrayToShuffle.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));
        [arrayToShuffle[i], arrayToShuffle[k]] = [array[j], array[i]];
    }
    return array;
}