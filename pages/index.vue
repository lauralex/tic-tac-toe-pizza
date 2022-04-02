<template>
  <div>
    <v-row justify='center' align='center'>
      <v-col cols='12' sm='8' md='6'>
        <v-card class='logo py-4 d-flex justify-center'>
          <NuxtLogo />
          <VuetifyLogo />
        </v-card>
        <v-card>
          <v-card-title class='headline'>
            Welcome to the Vuetify + Nuxt.js template
          </v-card-title>
          <v-card-text>
            <v-row v-for='(row, i) in board.cells' :key='i' no-gutters class='light-blue'>
              <v-col v-for='(box, j) in row' :key='j' style='border-style: solid; height: auto'>
                <v-btn width='100%' @click='addCross(i, j)'>{{ box }}</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color='primary' @click='resetData'> Reset </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <game-over-dialog :game-over-text='gameOverText' :game-over='gameOver' />
  </div>
</template>

<script>
import Board from '@/logic/board'

export default {
  name: 'IndexPage',
  data() {
    return {
      board: new Board(),
      gameOver: false,
      gameOverText: ''
    }
  },
  methods: {
    resetData() {
      this.board = new Board()
      this.gameOver = false
      this.gameOverText = ''
    },
    addCross(row, col) {
      if (this.gameOver) return
      try {
        this.board.markCell(row, col, 'x')
      } catch (e) {
        return
      }

      if (this.board.isGameOver()) {
        this.gameOver = true
        this.gameOverText = this.board.playerHas3InARow('x') ? 'You win' : 'Draw'
        return
      }

      const aiMove = this.minimax(this.board.clone(), 'o')
      this.board.markCell(aiMove.move.row, aiMove.move.col, 'o')

      if (this.board.isGameOver()) {
        this.gameOver = true
        this.gameOverText = this.board.playerHas3InARow('o') ? 'You lose' : 'Draw'
      }
    },
    minimax(board, player, depth = 1) {
      // If the board has 3 in a row return the score of the board.
      if (board.isGameOver()) {
        return {
          score: player === 'o' ? board.getScore() + depth : board.getScore() - depth,
          move: null
        }
      }

      // The 'o' player wants to maximize its score, the 'x' player wants to
      // minimize its score
      let bestScore = player === 'o' ? -10000 : 10000
      let bestMove = null

      const moves = board.getPossibleMoves()
      for (let i = 0; i < moves.length; i++) {
        const move = moves[i]
        const newBoard = board.clone()
        newBoard.markCell(move.row, move.col, player)

        // Recursively call the minimax function for the new board.
        const score = this.minimax(newBoard, player === 'x' ? 'o' : 'x', depth + 1).score

        // If the score is better than the best saved score update the best saved
        // score to this move.
        if ((player === 'o' && score > bestScore) || (player === 'x' && score < bestScore)) {
          bestScore = score
          bestMove = move
        }
      }

      // Return the best found score & move!
      return {
        score: bestScore,
        move: bestMove
      }
    }
  }
}
</script>
