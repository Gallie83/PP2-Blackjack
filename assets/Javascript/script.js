let dealerTotal = 0;
let yourTotal = 0;

let dealerAce = 0;
let yourAce = 0;

let dealerHand = [];
let yourHand = [];

/**
 * Builds Deck of 52 cards from A-S, A-D, A-C etc
 */
function buildDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];//This is the actual number value of the card
    const suits = ["S", "D", "C", "H"];//This represents the cards suit

    let deck = [];

    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            deck.push(values[i] + "-" + suits[j]);
        }
    }
    return deck
}

/**
 * Takes Deck of cards and shuffles it
 */
function shuffleDeck(deck) {
    for (let i = 0; i < 52; i++) {
        let tempCard = deck[i];
        let randomNum = Math.floor(Math.random() * 52);
        deck[i] = deck[randomNum]
        deck[randomNum] = tempCard;
    }
    console.log(newDeck);
}

let newDeck = buildDeck();
shuffleDeck(newDeck);


/**
 * 
 * Removes a card from the shuffled deck
 */
function dealCard() {
    let card = newDeck.pop();
    return card;
}

/**
 * Deals the dealer cards until he has a total of at least 16, and then deals the player two cards
 * While dealing the cards, it also calculates the value of each card and adds
 * how much each hand is worth
 */

function setTable() {
    dealerHand.unshift(topCard);
    dealerTotal += getValue(topCard);
    checkDealerAce(topCard);



    while (dealerTotal < 16) {
        let newCard = dealCard();
        dealerHand.push(newCard)
        dealerTotal += getValue(newCard);

        let cardImg = document.createElement("img");
        cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
        document.getElementById("cards-dealer").append(cardImg);

        checkDealerAce(newCard);
        smallAceDealer();



        console.log(dealerHand);
        console.log(dealerTotal);
    }

    while (yourHand.length < 2) {
        let newCard = dealCard();
        yourHand.push(newCard)
        yourTotal += getValue(newCard);

        let cardImg = document.createElement("img");
        cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
        document.getElementById("cards-yours").append(cardImg);

        checkYourAce(newCard);

        console.log(yourHand);
        console.log(yourTotal);
    }

}


/**
 * Calculates how much each card is worth
 */

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
 * This is the first card played to the dealer, the one face down
 */
let topCard = newDeck[0];
let topCardValue = getValue(topCard);


setTable();


/**
 * If Hit button is clicked, player draws an extra card
 */
const hitBtn = document.getElementById("hit-btn");
hitBtn.addEventListener("click", addPlayerCard);


function addPlayerCard() {
    if (yourTotal > 21) {
        return;
    }
    let newCard = dealCard();
    yourHand.push(newCard)
    yourTotal += getValue(newCard);
    console.log(yourHand);
    console.log(yourTotal);

    checkYourAce(newCard);
    smallAcePlayer();

    let cardImg = document.createElement("img");
    cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
    document.getElementById("cards-yours").append(cardImg);
}

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

function smallAcePlayer() {
    if (yourTotal > 21 && yourAce >= 1) {
        yourTotal -= 10;
        yourAce -= 1;
        console.log(yourTotal);
    }

}

function smallAceDealer() {
    if (dealerTotal > 21 && dealerAce >= 1) {
        dealerTotal -= 10;
        dealerAce -= 1;
    }

}
