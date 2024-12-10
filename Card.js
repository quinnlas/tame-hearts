export default class Card {
  constructor(number, suit) {
    this.number = number
    this.suit = suit
  }

  getNumericalValue() {
    if ('23456789'.indexOf(this.number) !== -1) return Number(this.number)
    
    return {
      'T': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
    }[this.number]
  }
}