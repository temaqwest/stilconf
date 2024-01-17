import { lazy } from 'react'

export const ConferencePageAsync = lazy(
    async () => await import('./ConferencePage')
)
