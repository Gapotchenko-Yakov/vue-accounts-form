<template>
  <el-row class="account-row">
    <!-- Метки -->
    <el-col :span="5">
      <el-form-item :error="errors.labelsInput">
        <el-input
          v-model="labelsInput.value.value"
          @blur="updateAccount"
          :placeholder="`метка1${LABELS_DELIMITER}метка2`"
        />
      </el-form-item>
    </el-col>

    <!-- Тип записи -->
    <el-col :span="4">
      <el-form-item :error="errors.type">
        <el-select 
          v-model="type.value.value" 
          @change="handleTypeChange"
        >
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </el-form-item>
    </el-col>

    <!-- Логин -->
    <el-col :span="type.value.value === 'LDAP' ? 8 : 4">
      <el-form-item :error="errors.login">
        <el-input 
          v-model="login.value.value" 
          @blur="updateAccount" 
        />
      </el-form-item>
    </el-col>

    <!-- Пароль -->
    <el-col :span="type.value.value === 'LDAP' ? 0 : 4">
      <el-form-item :error="errors.password" v-if="type.value.value === 'Локальная'">
        <el-input
          v-model="password.value.value"
          type="password"
          show-password
          @blur="updateAccount"
        />
      </el-form-item>
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
import { accountSchema } from '@/schemas/account.schema'
import type { Account } from '@/types/account'
import { Delete } from '@element-plus/icons-vue'
import { debounce } from 'lodash-es'
import { useField, useForm } from 'vee-validate'
import { computed, type PropType } from 'vue'

const props = defineProps({
  account: {
    type: Object as PropType<Account>,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])

const labelsString = props.account.labels.map((l) => l.text).join(LABELS_DELIMITER)

const initialValues = {
  ...props.account,
  labelsInput: labelsString,
}

const { handleSubmit, errors } = useForm({
  validationSchema: accountSchema,
  initialValues,
})
console.log("🚀 ~ errors:", errors)

const labelsInput = useField<string>('labelsInput')
const type = useField<string>('type')
const login = useField<string>('login')
const password = useField<string | null>('password')


// TODO: Extract labels <-> labelsInput transformation utils to separate module for reuse (DRY)

const parsedLabels = computed(() => {
  return labelsInput.value.value
    .split(LABELS_DELIMITER)
    .map((text) => ({ text: text.trim() }))
    .filter((label) => label.text)
})

const emitUpdate = handleSubmit((values) => {
  const updated = {
    ...values,
    labels: parsedLabels.value,
  }
  emit('update', updated)
})

const emitUpdateDebounced = debounce(emitUpdate, 500)

// TODO: Maybe use watch to detect 'type' changes instead of manual handler
const handleTypeChange = () => {
  if (type.value.value === 'LDAP') {
    password.value.value = null
  }
  emitUpdateDebounced()
}

const updateAccount = () => {
  emitUpdateDebounced()
}

const removeAccount = () => {
  emit('delete', props.account.id)
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