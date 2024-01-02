import { lazy } from 'react'

export const CreateSessionPageAsync = lazy(
    async () => await import('./CreateSessionPage')
)
