<template>
  <div class='text-center'>
    <v-dialog v-model='activated' width='500' transition='dialog-bottom-transition'>
      <v-card>
        <v-toolbar color='primary'>Game result</v-toolbar>
        <v-card-text>
          <div :class='"text-h2 pa-12 " + gameOverColor + "--text"'>{{ gameOverText }}</div>
        </v-card-text>
        <v-card-actions class='justify-end'>
          <v-btn color='primary' text @click='activated = false'>Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {

  name: 'GameOverDialog',

  props: {
    gameOver: {
      type: Boolean,
      required: true
    },
    gameOverText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      closed: false
    }
  },
  computed: {
    activated: {
      get() {
        return !this.closed && this.gameOver
      },
      set(newValue) {
        this.closed = !newValue
      }
    },
    gameOverColor() {
      if (this.gameOverText.endsWith('lose')) return 'red'
      if (this.gameOverText.endsWith('Draw')) return 'white'
      return 'green'
    }
  },
  watch: {
    gameOver(newGameOver, _) {
      if (newGameOver === false) {
        this.closed = false
      }
    }
  }
}
</script>
