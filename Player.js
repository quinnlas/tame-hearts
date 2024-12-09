export default class Player {
  score = 0
  hand = []
  bid = 0
  tricksTaken = 0

  constructor(name) {
    this.name = name
  }

  aiGetBid() {
    // TODO AI™
    return 1
  }
  aiPlayCard() {
    // TODO legal moves
    // TODO AI™
    return this.hand.pop
  }
}
