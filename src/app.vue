<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s ease;
  }

  .fade-leave {
  }

  .fade-leave-active {
    transition: opacity 1s ease;
    opacity: 0;
  }

</style>
