import Player from "./Player.js"

export default class Game {
  players = []
  round = 1

  constructor(numPlayers) {
    for (let i = 0; i < numPlayers; i++) {
      this.players.push(new Player())
    }
  }
}
