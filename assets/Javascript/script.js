const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];//This is the actual number value of the card
const suits = ["S", "D", "C", "H"];//This represents the cards suit

let deck = [];

for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < suits.length; j++) {
        deck.push(values[i] + suits[j]);
    }
}

console.log(deck)