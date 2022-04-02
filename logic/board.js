export default class Board {
  _cells = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  get cells() {
    return this._cells
  }

  markCell(row, col, player) {
    if (this._cells[row][col] !== '') throw new Error('Blank cell')

    this._cells[row].splice(col, 1, player)
  }

  playerHas3InARow(player) {
    const size = this._cells.length
    // Horizontal rows
    for (let i = 0; i < size; i++) {
      if (
        this._cells[i][0] === player &&
        this._cells[i][1] === player &&
        this._cells[i][2] === player
      ) {
        return true
      }
    }

    // vertical rows
    for (let i = 0; i < size; i++) {
      if (
        this._cells[0][i] === player &&
        this._cells[1][i] === player &&
        this._cells[2][i] === player
      ) {
        return true
      }
    }

    // Diagonals
    if (
      this._cells[0][0] === player &&
      this._cells[1][1] === player &&
      this._cells[2][2] === player
    ) {
      return true
    }
    if (
      this._cells[0][2] === player &&
      this._cells[1][1] === player &&
      this._cells[2][0] === player
    ) {
      return true
    }

    return false
  }

  getScore() {
    let score = 0
    if (this.playerHas3InARow('x')) {
      score -= 100
    }
    if (this.playerHas3InARow('o')) {
      score += 100
    }
    return score
  }

  getPossibleMoves() {
    const size = this._cells.length
    const moves = []
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this._cells[i][j] === '') {
          moves.push({ row: i, col: j })
        }
      }
    }
    return moves
  }

  isGameOver() {
    return (
      this.getPossibleMoves().length === 0 ||
      this.playerHas3InARow('x') ||
      this.playerHas3InARow('o')
    )
  }

  clone() {
    const boardClone = new Board()
    const size = this._cells.length

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        boardClone._cells[i][j] = this._cells[i][j]
      }
    }
    return boardClone
  }
}
