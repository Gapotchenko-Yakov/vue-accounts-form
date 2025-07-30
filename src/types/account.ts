type AccountType = 'LDAP' | 'Локальная'

export interface Label {
    text: string
}

export interface Account {
    id: string
    labels: Label[]
    labelsInput: string
    type: AccountType
    login: string
    password: string | null
}