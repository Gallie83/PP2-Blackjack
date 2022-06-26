// window.localStorage.setItem('dealerScore', '');
// window.localStorage.setItem('yourScore', '');

let dealerScore = 0;
let yourScore = 0;

// dealerScore = localStorage.getItem('dealer');
// yourScore = localStorage.getItem('your');

let dealerTotal = 0;
let yourTotal = 0;

let dealerAce = 0;
let yourAce = 0;

let dealerHand = [];
let yourHand = [];




function runGame() {
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

            document.getElementById("your-card-total").innerText = 'Your Cards:' + yourTotal;


            console.log(yourHand);
            console.log(yourTotal);
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
    hitBtn.addEventListener("click", hitSound);



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

        bust();
        fiveCard();

        let cardImg = document.createElement("img");
        cardImg.src = "../PP2-Blackjack/assets/cards/" + newCard + ".png";
        document.getElementById("cards-yours").append(cardImg);

        document.getElementById("your-card-total").innerText = 'Your Cards:' + yourTotal;
    }


    /**
     * Checks if player has gone over 21 when drawing a card and disables hitting or standing
     */
    function bust() {
        if (yourTotal > 21) {
            document.getElementById("message").innerText = "Bust!";
            dealerScore += 1;


            document.getElementById("dealer-score").innerText = 'Dealers Score:' + dealerScore;

            document.getElementById("hit-btn").disabled = true;
            document.getElementById("stand-btn").disabled = true;
        }
    }


    /**
     * If the player has 5 cards and is still under 21 they win
     */
    function fiveCard() {
        if (yourHand.length === 5 && yourTotal <= 21) {
            yourScore += 1;

            document.getElementById("message").innerText = "You Win!";
            document.getElementById("dealer-score").innerText = 'Dealers Score:' + dealerScore;
            document.getElementById("your-score").innerText = 'Your Score:' + yourScore;

            document.getElementById("hit-btn").disabled = true;
            document.getElementById("stand-btn").disabled = true;
        }
    }


    /**
     * Adds stand button feature
     */

    const stand = document.getElementById("stand-btn");
    stand.addEventListener("click", dealerHit);
    stand.addEventListener("click", flipCard);
    stand.addEventListener("click", compareScores);
    stand.addEventListener("click", hitSound);

    /**
     * If the dealer has a total of 16 when player chooses to stand,
     * the dealer will hit one more time
     */
    function dealerHit() {
        if (dealerTotal === 16) {
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
    }


    /**
     * Reveals dealers hidden card
     */
    function flipCard() {
        document.getElementById("face-down").src = "../PP2-Blackjack/assets/cards/" + topCard + ".png"
        document.getElementById("dealer-card-total").innerText = 'Dealer Cards:' + dealerTotal;
    }

    function compareScores() {
        let message = "";

        if (yourTotal > dealerTotal) {
            message = "You Win!";
            yourScore += 1;
        } else if (yourTotal < dealerTotal && dealerTotal > 21) {
            message = "You Win!";
            yourScore += 1;
        } else if (yourTotal === dealerTotal) {
            message = "Tie!";
        } else {
            message = "You Lose!";
            dealerScore += 1;
        }


        document.getElementById("message").innerText = message;
        document.getElementById("dealer-score").innerText = 'Dealers Score:' + dealerScore;
        document.getElementById("your-score").innerText = 'Your Score:' + yourScore;

        document.getElementById("hit-btn").disabled = true;
        document.getElementById("stand-btn").disabled = true;
    }


    /**
     * These functions check for aces in the player and dealer hand
     */

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

    /**
     * These functions let the Aces count for 1 if > 21
     */
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

}
/**
 * Audio effects
 */


let shuffleSound = function () {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/shuffling-cards-5.mp3");
    audio.play();
}


function hitSound() {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/card.mp3");
    audio.play();
}


function winSound() {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/win.mp3");
    audio.play();
}


function loseSound() {
    let audio = new Audio("../PP2-Blackjack/assets/sounds/awh.mp3");
    audio.play();
}

runGame();

const restart = document.getElementById("restart-btn");

restart.addEventListener("click", clearTable);
restart.addEventListener("click", clearHands);
restart.addEventListener("click", unflipCard);
restart.addEventListener("click", runGame);
restart.addEventListener("click", buttons);

function clearHands() {
    dealerTotal = 0;
    yourTotal = 0;

    dealerAce = 0;
    yourAce = 0;

    dealerHand = [];
    yourHand = [];

}

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

function unflipCard() {
    document.getElementById("face-down").src = "../PP2-Blackjack/assets/cards/BACK.png";
    // let topCardImg = document.createElement("img");
    // topCardImg.src = "../PP2-Blackjack/assets/cards/BACK.png";
    // document.getElementById("face-down").append(topCardImg);

}

