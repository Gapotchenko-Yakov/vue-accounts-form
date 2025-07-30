<template>
  <el-row class="account-row">
    <!-- Метки -->
    <el-col :span="5">
      <el-input
        v-model="localAccount.labelsInput"
        @blur="parseLabels"
        :placeholder="`метка1${LABELS_DELIMITER}метка2`"
      />
    </el-col>

    <!-- Тип записи -->
    <el-col :span="4">
      <el-select 
        v-model="localAccount.type" 
        @change="handleTypeChange"
      >
        <el-option label="LDAP" value="LDAP" />
        <el-option label="Локальная" value="Локальная" />
      </el-select>
    </el-col>

    <!-- Логин -->
    <el-col :span="localAccount.type === 'LDAP' ? 8 : 4">
      <el-input 
        v-model="localAccount.login" 
        @blur="updateAccount" 
      />
    </el-col>

    <!-- Пароль -->
    <el-col :span="localAccount.type === 'LDAP' ? 0 : 4">
      <el-input
        v-if="localAccount.type === 'Локальная'"
        v-model="localAccount.password"
        type="password"
        @blur="updateAccount"
      />
      <span v-else class="empty-field">—</span>
    </el-col>

    <!-- Действия -->
    <el-col :span="3">
      <el-button
        type="danger"
        :icon="Delete"
        circle
        @click="removeAccount"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { LABELS_DELIMITER } from '@/const/accounts'
import type { Account, Label } from '@/types/account'
import { Delete } from '@element-plus/icons-vue'
import { ref, watch, type PropType } from 'vue'

const props = defineProps({
  account: {
    type: Object as PropType<Account>,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])

// Локальная копия для редактирования
const localAccount = ref({
  ...props.account,
  labelsInput: props.account.labels?.map((l:Label) => l.text).join(LABELS_DELIMITER) || ''
})

// Синхронизация при изменении пропса
watch(() => props.account, (newAccount) => {
  localAccount.value = {
    ...newAccount,
    labelsInput: newAccount.labels?.map((l:Label) => l.text).join(LABELS_DELIMITER) || ''
  }
}, { deep: true })

const parseLabels = () => {
  const updated = {
    ...localAccount.value,
    labels: localAccount.value.labelsInput
      .split(LABELS_DELIMITER)
      .map((text: string) => ({ text: text.trim() }))
      .filter((item: Label) => item.text)
  }
  emit('update', updated)
}

const handleTypeChange = () => {
  if (localAccount.value.type === 'LDAP') {
    localAccount.value.password = null
  }
  emit('update', localAccount.value)
}

const updateAccount = () => {
  emit('update', localAccount.value)
}

const removeAccount = () => {
  emit('delete', localAccount.value.id)
}
</script>

<style scoped>
.account-row {
  margin-bottom: 16px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--el-border-color);
}

.empty-field {
  color: var(--el-text-color-secondary);
  padding: 0 12px;
}

.el-input, .el-select {
  width: 100%;
}
</style>