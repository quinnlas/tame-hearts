export default class Player {
  score = 0
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

  playCard() {
    if (this.ai) return this.aiPlayCard()
  }

  aiGetBid() {
    // TODO AI™
    return 1
  }

  aiPlayCard() {
    // TODO legal moves
    // TODO AI™
    return this.hand.pop()
  }
}
