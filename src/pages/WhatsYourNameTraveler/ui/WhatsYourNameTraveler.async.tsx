import { lazy } from 'react'

export const WhatsYourNameTravelerAsync = lazy(
    async () => await import('./WhatsYourNameTraveler')
)
