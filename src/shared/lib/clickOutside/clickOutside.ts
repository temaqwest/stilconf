import { useEffect, useRef } from 'react'

export function useClickOutside(callback: () => void, elementId = '') {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            const cEl = e.target

            if (ref.current && !ref.current.contains(cEl as Node)) {
                if (!elementId.length || (cEl as HTMLElement).id !== elementId)
                    callback()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [callback])

    return ref
}
