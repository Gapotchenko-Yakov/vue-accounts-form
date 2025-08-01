<template>
<!-- TODO: Extract AccountPage component when using multipage SPA with router -->
  <div class="accounts-list">
    <div class="list-header">
      <h2>Учетные записи</h2>
      <el-button type="primary" @click="addAccount" :icon="Plus">
        Добавить
      </el-button>
    </div>

    <el-row class="info-row">
    <el-icon class="info-icon" size="24"><QuestionFilled /></el-icon>
    <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b></span>
  </el-row>

    <!-- Шапка списка -->
    <el-row :gutter="20" class="account-row header-row">
      <el-col :span="8">Метки</el-col>
      <el-col :span="4">Тип записи</el-col>
      <el-col :span="5">Логин</el-col>
      <el-col :span="5">Пароль</el-col>
      <el-col :span="2" />
    </el-row>

    <!-- Список учетных записей -->
    <account-item
      v-for="account in accounts" 
      :key="account.id"
      :account="account"
      @update="store.updateAccount"
      @delete="store.removeAccount"
      :gutter="20" 
    />
      
    <!-- Пустое состояние -->
    <el-empty 
      v-if="accounts.length === 0" 
      description="Нет учетных записей" 
    />
  </div>
</template>

<script setup lang="ts">
import  AccountItem  from '@/components/AccountItem.vue'
import { LABELS_DELIMITER } from '@/const/accounts'
import { useAccountsStore } from '@/stores/accounts'
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

const store = useAccountsStore()
const { accounts } = storeToRefs(store)
const { addAccount } = store

// Инициализация временного поля для меток
accounts.value.forEach(acc => {
  if (!Array.isArray(acc.labels)) acc.labels = []
  acc.labelsInput = acc.labels.map(l => l.text).join(LABELS_DELIMITER)
})


</script>

<style scoped>
.accounts-list {
  padding: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-row {
  font-weight: bold;
  padding: 8px 0;
  border-bottom: 2px solid var(--el-border-color);
}

.empty-field {
  color: var(--el-text-color-secondary);
  padding: 0 12px;
}

.info-row {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.info-icon {
  margin-right: 12px;
  flex-shrink: 0;
}

.el-input, .el-select {
  width: 100%;
}
</style>