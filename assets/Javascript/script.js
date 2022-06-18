let dealerTotal = 0;
let yourTotal = 0;

let dealerAce = 0;
let yourAce = 0;

let dealerHand = [];
let yourHand = [];

let hit = true;

let faceDown;

/**
 * Builds Deck of 52 cards from A-S, A-2, A-3 etc
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



function dealCards() {
    faceDown = deck.shift();
    dealerTotal += getValue(faceDown);
}

function getValue(card) {
    let data = card.split("-")[0];
    let dataValue = parseInt(data);



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

let topCard = newDeck[0];
let topCardValue = getValue(topCard);

console.log(topCardValue);
