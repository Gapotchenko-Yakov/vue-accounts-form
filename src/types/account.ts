type AccountType = 'LDAP' | 'Локальная'

interface Label {
    text: string
}

export interface Account {
    id: string
    labels: Label[]
    type: AccountType
    login: string
    password: string | null
}