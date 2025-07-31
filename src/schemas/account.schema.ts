import { LABELS_DELIMITER } from '@/const/accounts'
import * as yup from 'yup'
import { LIMITS } from '@/const/limits'
import { VALIDATION_ERRORS } from '@/const/validationErrors'

export const accountSchema = yup.object({
    labelsInput: yup
        .string()
        .max(LIMITS.labelsInputMaxLength, VALIDATION_ERRORS.maxLength(LIMITS.labelsInputMaxLength))
        .test(
            'valid-labels',
            VALIDATION_ERRORS.invalidLabelsFormat,
            value => {
                // TODO: Currently trailing delimiter (e.g. ending with ';') is considered invalid,
                // which matches provided examples. Need to confirm with client whether trailing
                // delimiter should be allowed or not, and adjust validation accordingly.
                if (!value) return true
                const parts = value.split(LABELS_DELIMITER).map(s => s.trim())
                return parts.every(p => p.length > 0)
            }
        )
        .nullable(),

    type: yup
        .string()
        .required(VALIDATION_ERRORS.required)
        .oneOf(['LDAP', 'Локальная'], VALIDATION_ERRORS.invalidType),

    login: yup
        .string()
        .required(VALIDATION_ERRORS.required)
        .max(LIMITS.loginMaxLength, VALIDATION_ERRORS.maxLength(LIMITS.loginMaxLength)),

    password: yup
        .string()
        .when('type', {
            is: 'Локальная',
            then: schema =>
                schema
                    .required(VALIDATION_ERRORS.required)
                    .max(LIMITS.passwordMaxLength, VALIDATION_ERRORS.maxLength(LIMITS.passwordMaxLength)),
            otherwise: schema => schema.nullable(),
        }),
})
