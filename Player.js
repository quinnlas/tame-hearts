export default class Player {
  score = 0
  hand = []
  bid = 0
  tricksTaken = 0

  aiGetBid() { return 1 }
  aiPlayCard() { return this.hand.pop }
}