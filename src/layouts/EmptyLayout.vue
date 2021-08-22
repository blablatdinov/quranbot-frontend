<template>
  <div class="empty_layout">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style>
  .container {
    min-height: 100vh;
  }
  .empty_layout {
    background-color: grey;
  }
</style>
