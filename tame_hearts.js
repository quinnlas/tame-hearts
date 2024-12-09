import Card from './Card.js'
import Game from './Game.js'

const PLAYERS = 4

function createDeck() {
  const deck = []
  for (let num of 'A23456789TJQK') {
    for (let suit of '♣♦♠♥') {
      deck.push(new Card(num, suit))
    }
  }

  return deck
}

// shuffle the deck in place and return it
function shuffle(deck) {
  const cards = deck.splice(0, deck.length)

  while (cards.length) {
    const randIndex = Math.floor(Math.random() * cards.length)
    deck.push(cards.splice(randIndex, 1)[0])
  }

  return deck
}

function playGame() {
  const game = new Game(PLAYERS)

  // Do Rounds
  for (; game.round <= 10; game.round++) {
    // DEAL
    const deck = shuffle(createDeck())

    const numCardsPerPlayer = 11 - game.round
    for (let player of game.players) {
      for (let i = 0; i < numCardsPerPlayer; i++) {
        player.hand.push(deck.pop())
      }
    }    
  }
}

playGame()
