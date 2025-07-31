import { LABELS_DELIMITER } from '@/const/accounts'
import * as yup from 'yup'

// TODO: extract error messages to separate const file for localization and message unification
export const accountSchema = yup.object({
    // Метки (labelsInput) — необязательное поле, максимум 50 символов на всю строку,
    // строка с метками через LABELS_DELIMITER (по умолчанию ";"), проверяем длину и формат
    labelsInput: yup
        .string()
        .max(50, 'Максимум 50 символов')
        .test(
            'valid-labels',
            'Метки должны быть разделены точкой с запятой и не содержать пустых значений',
            value => {
                if (!value) return true // поле не обязательно
                const parts = value.split(LABELS_DELIMITER).map(s => s.trim())
                return parts.every(p => p.length > 0)
            }
        )
        .nullable(),

    // Тип записи — обязателен, только 'LDAP' или 'Локальная'
    type: yup
        .string()
        .required('Тип записи обязателен')
        .oneOf(['LDAP', 'Локальная'], 'Недопустимый тип записи'),

    // Логин — обязательный, максимум 100 символов
    login: yup
        .string()
        .required('Логин обязателен')
        .max(100, 'Максимум 100 символов'),

    // Пароль — обязателен, если тип 'Локальная', максимум 100 символов
    password: yup
        .string()
        .when('type', {
            is: 'Локальная',
            then: schema => schema.required('Пароль обязателен').max(100, 'Максимум 100 символов'),
            otherwise: schema => schema.nullable()
        })
})
