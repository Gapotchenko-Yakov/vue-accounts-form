import type { Account } from "@/types/account";
import { defineStore } from "pinia";

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as Account[],
    }),
    actions: {
        addAccount() {
            this.accounts.push({
                id: crypto.randomUUID(),
                labels: [],
                type: 'Локальная',
                login: '',
                password: ''
            })
        },
        removeAccount(id: string) {
            this.accounts = this.accounts.filter(a => a.id !== id)
        },
        updateAccount(updated: Account) {
            const index = this.accounts.findIndex(a => a.id === updated.id)
            if (index !== -1) this.accounts[index] = updated
        }
    },
    persist: true
})