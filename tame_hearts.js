import Card from './Card.js'

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

console.log(shuffle(createDeck()))