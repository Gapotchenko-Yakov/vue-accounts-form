import { LABELS_DELIMITER } from "./accounts";

export const VALIDATION_ERRORS = {
    required: 'Обязательное поле',
    maxLength: (n: number) => `Максимум ${n} символов`,
    invalidLabelsFormat: `Метки должны быть разделены '${LABELS_DELIMITER}' и не содержать пустых значений`,
    invalidType: 'Недопустимый тип записи',
}
