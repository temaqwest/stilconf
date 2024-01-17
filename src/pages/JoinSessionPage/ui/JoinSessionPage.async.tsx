import { lazy } from 'react'

export const JoinSessionPageAsync = lazy(
    async () => await import('./JoinSessionPage')
)
