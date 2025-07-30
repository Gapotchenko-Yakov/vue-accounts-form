<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)

const showDialog = () => {
  dialogVisible.value = true
}

const handleConfirm = () => {
  alert('Действие подтверждено!')
  dialogVisible.value = false
}
</script>
<template>
  <div class="app">
    <el-button type="primary" @click="showDialog">Открыть</el-button>
    
    <el-dialog v-model="dialogVisible" title="Подтверждение">
      <p>Вы уверены?</p>
      <template #footer>
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="handleConfirm">Подтвердить</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
}
</style>