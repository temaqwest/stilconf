import { KeyboardEvent } from 'react'

export enum KeyupShortkeys {
    Enter = 'Enter',
    Alt = 'Alt',
    CapsLock = 'CapsLock',
    Shift = 'Shift',
    Tab = 'Tab'
}

export function useKeyupHandler() {
    function createKeyupHandler(
        key: KeyupShortkeys,
        callback: (event: KeyboardEvent) => void
    ) {
        return function (e: KeyboardEvent) {
            if (e.key === key) {
                callback(e)
            }
        }
    }

    return { createKeyupHandler }
}
