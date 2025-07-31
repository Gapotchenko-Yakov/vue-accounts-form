export const VALIDATION_ERRORS = {
    required: 'Обязательное поле',
    maxLength: (n: number) => `Максимум ${n} символов`,
    invalidLabelsFormat: 'Метки должны быть разделены точкой с запятой и не содержать пустых значений',
    invalidType: 'Недопустимый тип записи',
}
