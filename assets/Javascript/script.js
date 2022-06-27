let dealerScore = 0;
let yourScore = 0;

let dealerTotal = 0;
let yourTotal = 0;

let dealerAce = 0;
let yourAce = 0;

let dealerHand = [];
let yourHand = [];

let newDeck = [];



//  Builds Deck of 52 cards from A-S, A-D, A-C etc
function buildDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];//This is the actual number value of the card
    const suits = ["S", "D", "C", "H"];//This represents the cards suit

    let deck = [];

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            deck.push(values[i] + "-" + suits[j]);
        }
    }
    return deck;
}

//  Takes Deck of cards and shuffles it
function shuffleDeck(deck) {
    for (let i = 0; i < 52; i++) {
        let tempCard = deck[i];
        let randomNum = Math.floor(Math.random() * 52);
        deck[i] = deck[randomNum]
        deck[randomNum] = tempCard;
    }
}

//   Removes a card from the shuffled deck
function dealCard(newDeck) {
    let card = newDeck.pop();
    return card;
}

/**
 * Deals the dealer two cards,and then deals the player two cards
 * While dealing the cards, it also calculates the value of each card and adds
 * how much each hand is worth, and checks for a blackjack in player hand
 */
function setTable(topCard, newDeck) {
    dealerHand.unshift(topCard);
    dealerTotal += getValue(topCard);
    checkDealerAce(topCard);



    if (dealerHand.length < 2) {
        let newCard = dealCard(newDeck);
        dealerHand.push(newCard)
        dealerTotal += getValue(newCard);

        let cardImg = document.createElement("img");
        cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
        document.getElementById("cards-dealer").append(cardImg);

        checkDealerAce(newCard);
        smallAceDealer();
    }

    while (yourHand.length < 2) {
        let newCard = dealCard(newDeck);
        yourHand.push(newCard)
        yourTotal += getValue(newCard);

        let cardImg = document.createElement("img");
        cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
        document.getElementById("cards-yours").append(cardImg);

        checkYourAce(newCard);

        document.getElementById("your-card-total").innerText = 'Your Total:' + yourTotal;
    }
    blackJack();
}


/**
 * When table is set, this checks if player gets an instant blackjack and,
 * adds to their win count
 */
function blackJack() {
    if (yourTotal === 21) {
        document.getElementById("message").innerText = "BlackJack!";
        yourScore += 1;

        document.getElementById("your-score").innerText = 'Your Score:' + yourScore;

        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stand-btn").disabled = true;

        winSound();
    }
}

// Calculates how much each card is worth
function getValue(card) {
    let data = card.split("-")[0];
    let dataValue = parseInt(data);

    /**
     * Determines the value of non-number cards
     */
    if (isNaN(dataValue)) {
        ;
        if (data === 'A') {
            return 11;
        } else {
            return 10;
        }
    } else {
        return dataValue;
    }
}
/** 
 * Adds card to player hand and checks if player exceeds 21 or
 * wins via 5 card rule
*/
function addPlayerCard(newDeck) {
    let newCard = dealCard(newDeck);
    yourHand.push(newCard)
    yourTotal += getValue(newCard);

    checkYourAce(newCard);
    smallAcePlayer();

    if (yourTotal > 21) {
        bust();
    }
    fiveCard();

    let cardImg = document.createElement("img");
    cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
    document.getElementById("cards-yours").append(cardImg);

    document.getElementById("your-card-total").innerText = 'Your Total:' + yourTotal;

    if (yourTotal === 21) {
        compareScores();
    }


}



// Checks if player has gone over 21 when drawing a card and disables hitting or standing
function bust() {
    document.getElementById("message").innerText = "Bust!";
    dealerScore += 1;


    document.getElementById("dealer-score").innerText = 'Dealers Score:' + dealerScore;

    document.getElementById("hit-btn").disabled = true;
    document.getElementById("stand-btn").disabled = true;

    loseSound();
}


// If the player has 5 cards and is still under 21 they win
function fiveCard() {
    if (yourHand.length === 5 && yourTotal <= 21) {
        yourScore += 1;

        document.getElementById("message").innerText = "You Win!";
        document.getElementById("dealer-score").innerText = 'Dealers Score:' + dealerScore;
        document.getElementById("your-score").innerText = 'Your Score:' + yourScore;

        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stand-btn").disabled = true;

        winSound();
    }
}


/**
 * If the dealer has less than 17 when player chooses to stand,
 * the dealer will hit
 */
function dealerHit(newDeck) {
    while (dealerTotal < 17) {
        let newCard = dealCard(newDeck);
        dealerHand.push(newCard)
        dealerTotal += getValue(newCard);

        let cardImg = document.createElement("img");
        cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
        document.getElementById("cards-dealer").append(cardImg);

        checkDealerAce(newCard);
        smallAceDealer();
    }
}


// Reveals dealers hidden card
function flipCard(topCard, dealerTotal) {
    document.getElementById("face-down").src = "../PP2-Blackjack/assets/cards/" + topCard + ".png";
    document.getElementById("dealer-card-total").innerText = 'Dealer Total:' + dealerTotal;
}

//Compares scores and returns message stating winner
function compareScores() {
    let message = "";

    if (yourTotal > dealerTotal) {
        message = "You Win!";
        yourScore += 1;
        winSound();
    } else if (yourTotal < dealerTotal && dealerTotal > 21) {
        message = "You Win!";
        winSound();
        yourScore += 1;
    } else if (yourTotal === dealerTotal) {
        message = "Tie!";
    } else {
        message = "You Lose!";
        dealerScore += 1;
        loseSound();
    }


    document.getElementById("message").innerText = message;
    document.getElementById("dealer-score").innerText = 'Dealers Score:' + dealerScore;
    document.getElementById("your-score").innerText = 'Your Score:' + yourScore;

    document.getElementById("hit-btn").disabled = true;
    document.getElementById("stand-btn").disabled = true;
}



// These functions check for aces in the player and dealer hand
function checkYourAce(card) {
    if (card[0] === 'A') {
        yourAce += 1;
    }
}

function checkDealerAce(card) {
    if (card[0] === 'A') {
        dealerAce += 1;
    }
}

// These functions let the Aces count for 1 if > 21
function smallAcePlayer() {
    if (yourTotal > 21 && yourAce >= 1) {
        yourTotal -= 10;
        yourAce -= 1;
    }

}

function smallAceDealer() {
    if (dealerTotal > 21 && dealerAce >= 1) {
        dealerTotal -= 10;
        dealerAce -= 1;
    }
}

// Calls player hit function and adds sound effect
function hitMe(newDeck) {
    addPlayerCard(newDeck);
    hitSound();
}

// If Hit button is clicked, player draws an extra card
const hitBtn = document.getElementById("hit-btn");
hitBtn.addEventListener("click", () => {
    hitMe(newDeck);
});

// The function that runs every time a new hand is dealt
function runGame() {
    newDeck = buildDeck();
    shuffleDeck(newDeck);

    //  This is the first card played to the dealer, the one face down
    let topCard = newDeck[0];
    let topCardValue = getValue(topCard);

    setTable(topCard, newDeck);

    // Adds stand button feature
    const stand = document.getElementById("stand-btn");
    stand.addEventListener("click", function () { dealerHit(newDeck) });
    stand.addEventListener("click", function () { flipCard(topCard, dealerTotal) });
    stand.addEventListener("click", compareScores);
    stand.addEventListener("click", hitSound);

    shuffleSound();
}

// Runs game on initial load
runGame();


// Clears table and resets hands when New Deal is clicked
const restart = document.getElementById("restart-btn");
restart.addEventListener("click", () => {
    clearTable();
    clearHands();
    unflipCard();
    runGame();
    buttons();
    killListener();
});

function clearHands() {
    dealerTotal = 0;
    yourTotal = 0;

    dealerAce = 0;
    yourAce = 0;

    dealerHand = [];
    yourHand = [];

}

// Resets hit and stand buttons
function buttons() {
    document.getElementById("hit-btn").disabled = false;
    document.getElementById("stand-btn").disabled = false;
}

function clearTable() {
    document.getElementById("cards-dealer").innerHTML = "";
    document.getElementById("cards-yours").innerHTML = "";
    document.getElementById("dealer-card-total").innerHTML = "";
    document.getElementById("message").innerHTML = "";
}

// Turns dealers first card image to back of card
function unflipCard() {
    document.getElementById("face-down").src = "../PP2-Blackjack/assets/cards/BACK.png";
}

/**
 * Everytime a new hand was dealt, a new event listener for addPlayerCard
 * was duplicated, calling an extra card, this functions ensures addPlayerCard 
 * only draws one card for player
 */
function killListener() {
    removeEventListener("click", document.getElementById("hit-btn"));
}

// Audio effects
function hitSound() {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/card.mp3");
    audio.play();
}

function shuffleSound() {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/shuffling.mp3");
    audio.play();
}


function winSound() {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/win.mp3");
    audio.volume = 0.6;
    audio.play();
}


function loseSound() {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/awh.mp3");
    audio.play();
}
