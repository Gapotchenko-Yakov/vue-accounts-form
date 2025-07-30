<template>
  <div class="app-container">
    <accounts-list />
  </div>
</template>

<script setup lang="ts">
import AccountsList from '@/components/AccountsList.vue'
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>