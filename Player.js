import Card from "./Card.js"
export default class Player {
  score = 0
  /** @type {Card[]} */
  hand = []
  bid = 0
  tricksTaken = 0

  constructor(name, ai) {
    this.name = name
    this.ai = ai
  }

  getBid() {
    if (this.ai) return this.aiGetBid()
  }

  playCard(playedCards, heartsBroken) {
    if (this.ai) return this.aiPlayCard(playedCards, heartsBroken)
  }

  aiGetBid() {
    // TODO AI™
    return 1
  }

  _getLegalMoves(playedCards, heartsBroken) {
    if (!playedCards.length) {
      // DETERMINE LEGAL LEADS
      if (heartsBroken || this.hand.every(c => c.suit === '♥')) return this.hand
      return this.hand.filter(c => c.suit !== '♥')
    }

    // FOLLOW SUIT IF YOU CAN
    const leadSuit = playedCards[0].suit

    return this.hand.some((c) => c.suit === leadSuit)
      ? this.hand.filter((c) => c.suit === leadSuit)
      : this.hand
  }

  aiPlayCard(playedCards, heartsBroken) {
    const legalMoves = this._getLegalMoves(playedCards, heartsBroken)
    const move = legalMoves[0] // TODO + AI™
    return this.hand.splice(
      this.hand.findIndex(
        (c) => c.suit === move.suit && c.number === move.number
      ),
      1
    )[0]
  }
}
