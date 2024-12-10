import Card from './Card.js'
import Game from './Game.js'
import _ from 'lodash'

const PLAYERS = 4
const LOG_GAME = true

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
  const indexStr = _(cards)
    .toPairs()
    .filter(p => p[1].suit === suit)
    .maxBy(p => p[1].getNumericalValue())[0]
  return Number(indexStr)
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

function logGame(...data) {
  if (LOG_GAME) console.log(...data)
}

function playGame() {
  const game = new Game(PLAYERS)

  // Do Rounds
  for (; game.round <= 10; game.round++) {
    logGame(`ROUND ${game.round}`)

    // DEAL
    const deck = shuffle(createDeck())

    const numCardsPerPlayer = 11 - game.round
    for (let player of game.players) {
      for (let i = 0; i < numCardsPerPlayer; i++) {
        player.hand.push(deck.pop())
      }
    }

    logGame()
    logGame(`Dealer is ${game.players[game.dealerIndex].name}.`)
    logGame()
    
    // BIDDING
    for (let bidOrderIndex = 0; bidOrderIndex < PLAYERS; bidOrderIndex++) {
      const playerWithBid = game.players[(game.leadIndex + bidOrderIndex) % PLAYERS]
      playerWithBid.bid = playerWithBid.getBid()
      logGame(`${playerWithBid.name} bids ${playerWithBid.bid}.`)

      playerWithBid.tricksTaken = 0
    }

    // PLAYING
    game.heartsBroken = false

    logGame()

    for (let trickIndex = 0; trickIndex < numCardsPerPlayer; trickIndex++) {
      // PLAY TRICK CARDS
      const playedCards = []

      logGame(`${game.players[game.leadIndex].name} leads.`)

      for (let playerOrderIndex = 0; playerOrderIndex < PLAYERS; playerOrderIndex++) {
        const playerWithTurn = game.players[(game.leadIndex + playerOrderIndex) % PLAYERS]
        const playedCard = playerWithTurn.playCard(playedCards, game.heartsBroken)
        if (playedCard.suit === '♥') game.heartsBroken = true
        logGame(`${playerWithTurn.name} plays ${playedCard.number}${playedCard.suit}.`)
        
        playedCards.push(playedCard)
      }

      // DETERMINE TRICK TAKER
      const trickTakerOrderIndex = determineTrickTakerIndex(playedCards)
      const trickTakerPlayerIndex = (game.leadIndex + trickTakerOrderIndex) % PLAYERS

      const trickTaker = game.players[trickTakerPlayerIndex]
      trickTaker.tricksTaken++

      logGame(`${trickTaker.name} takes the trick and has ${trickTaker.tricksTaken}.`)
      logGame()

      game.leadIndex = trickTakerPlayerIndex
    }

    logGame(`Scores:`)

    // SCORING
    const roundBaseScore = game.round * 10
    for (let player of game.players) {
      player.score += Math.abs(player.tricksTaken - player.bid) * roundBaseScore
      logGame(`${player.name}: ${player.bid}/${player.tricksTaken} ${player.score}`)
    }
    logGame()

    game.dealerIndex = (game.dealerIndex + 1) % PLAYERS
    game.leadIndex = (game.dealerIndex + 1) % PLAYERS

  }

  const winningScore = Math.min(...game.players.map(p => p.score))
  const winners = game.players.filter(p => p.score === winningScore)
  console.log(`Game won by ${winners.map(p => p.name)}`)
}

playGame()
