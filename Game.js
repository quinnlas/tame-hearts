import Player from "./Player.js"

export default class Game {
  /** @type {Player[]} */
  players = []
  round = 1
  heartsBroken = false
  dealerIndex = 0
  leadIndex = 1

  constructor(numPlayers) {
    for (let i = 0; i < numPlayers; i++) {
      this.players.push(new Player(`Player ${i + 1}`))
    }
  }
}
