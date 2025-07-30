<template>
  <div class="accounts-list">
    <div class="list-header">
      <h2>Учетные записи</h2>
      <el-button type="primary" @click="addAccount" :icon="Plus">
        Добавить
      </el-button>
    </div>

    <!-- Шапка списка -->
    <el-row :gutter="20" class="account-row header-row">
      <el-col :span="5">Метки</el-col>
      <el-col :span="4">Тип записи</el-col>
      <el-col :span="4">Логин</el-col>
      <el-col :span="4">Пароль</el-col>
      <el-col :span="3">Действия</el-col>
    </el-row>

    <!-- Список учетных записей -->
    <el-row 
      v-for="account in accounts" 
      :key="account.id"
      :gutter="20" 
      class="account-row"
    >
      <!-- Метки -->
      <el-col :span="5">
        <el-input
          v-model="account.labelsInput"
          @blur="parseLabels(account)"
          placeholder="метка1; метка2"
        />
      </el-col>

      <!-- Тип записи -->
      <el-col :span="4">
        <el-select 
          v-model="account.type" 
          @change="handleTypeChange(account)"
          style="width: 100%"
        >
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </el-col>

      <!-- Логин -->
      <el-col :span="account.type === 'LDAP' ? 8 : 4">
        <el-input 
          v-model="account.login" 
          @blur="updateAccount(account)" 
        />
      </el-col>

      <!-- Пароль -->
      <el-col :span="account.type === 'LDAP' ? 0 : 4">
        <el-input
          v-if="account.type === 'Локальная'"
          v-model="account.password"
          type="password"
          @blur="updateAccount(account)"
        />
      </el-col>

      <!-- Действия -->
      <el-col :span="3">
        <el-button
          type="danger"
          :icon="Delete"
          circle
          @click="removeAccount(account.id)"
        />
      </el-col>
    </el-row>

    <!-- Пустое состояние -->
    <el-empty 
      v-if="accounts.length === 0" 
      description="Нет учетных записей" 
    />
  </div>
</template>

<script setup lang="ts">
// Импорты и логика остаются без изменений
import { Plus, Delete } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useAccountsStore } from '@/stores/accounts'
import type { Account } from '@/types/account'

const store = useAccountsStore()
const { accounts } = storeToRefs(store)
const { addAccount, removeAccount, updateAccount } = store

// Инициализация временного поля для меток
accounts.value.forEach(acc => {
  if (!Array.isArray(acc.labels)) acc.labels = []
  acc.labelsInput = acc.labels.map(l => l.text).join('; ')
})

const parseLabels = (account: Account) => {
  account.labels = account.labelsInput
    .split(';')
    .map(text => ({ text: text.trim() }))
    .filter(item => item.text)
  updateAccount(account)
}

const handleTypeChange = (account: Account) => {
  if (account.type === 'LDAP') {
    account.password = null
  }
  updateAccount(account)
}
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

.account-row {
  margin-bottom: 16px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--el-border-color);
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

.el-input, .el-select {
  width: 100%;
}
</style>