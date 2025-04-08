<script setup lang="ts"></script>

<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-grow: 1;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  background-color: white;
  padding: 15px;
}
</style>
