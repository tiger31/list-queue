<template>
    <header>
      <v-icon :size="40" color="white">hourglass_empty</v-icon>
      FIFO
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="scss">
  header {
    min-height: 60px;
    max-height: 10vh;
    color: white;
    background-color: green;
    box-shadow: 0 0 2px 0 rgba(75,75,75, 0.75);
    display: flex;
    align-content: flex-start;
    align-items: center;
    padding-left: 20px;
  }
</style>
