import Card from './Card.js'
import Game from './Game.js'
import _ from 'lodash'

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

function getIndexOfHighestOfSuit(cards, suit) {
  return _(cards)
    .toPairs()
    .filter(p => p[1].suit === suit)
    .maxBy(p => p[1].getNumericalValue())[0]
}

// assume that the lead is at index 0
function determineTrickTakerIndex(playedCards) {
  // if any hearts, choose the highest one
  if (playedCards.some(c => c.suit === '♥')) {
    return getIndexOfHighestOfSuit(playedCards, '♥')
  }

  // otherwise, it's the highest of the lead suit
  const leadSuit = playedCards[0].suit
  return getIndexOfHighestOfSuit(playedCards, leadSuit)
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
    
    // BIDDING
    for (let player of game.players) {
      // TODO correct order based on dealer
      player.bid = player.getBid()
      player.tricksTaken = 0
    }

    // PLAYING
    game.heartsBroken = false

    for (let trickIndex = 0; trickIndex < numCardsPerPlayer; trickIndex++) {
      // PLAY TRICK CARDS
      const playedCards = []

      for (let playerOrderIndex = 0; playerOrderIndex < PLAYERS; playerOrderIndex++) {
        const playerWithTurn = game.players[(game.leadIndex + playerOrderIndex) % PLAYERS]
        
        playedCards.push(playerWithTurn.playCard())
      }

      // DETERMINE TRICK TAKER
      const trickTakerOrderIndex = determineTrickTakerIndex(playedCards)
      const trickTakerPlayerIndex = (game.leadIndex + trickTakerOrderIndex) % PLAYERS

      game.players[trickTakerPlayerIndex].tricksTaken++
      game.leadIndex = trickTakerPlayerIndex
    }

    // SCORING
    const roundBaseScore = game.round * 10
    for (let player of game.players) {
      player.score += Math.abs(player.tricksTaken - player.bid) * roundBaseScore
    }

    console.log(game)
  }

  const winningScore = Math.min(...game.players.map(p => p.score))
  const winners = game.players.filter(p => p.score === winningScore)
  console.log(`Game won by ${winners.map(p => p.name)}`)
}

playGame()
