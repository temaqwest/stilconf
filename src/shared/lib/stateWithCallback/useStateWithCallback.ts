import { useCallback, useEffect, useRef, useState } from 'react'

const useStateWithCallback = (initialState: any) => {
    const [state, setState] = useState<any>(initialState)
    const callbackRef = useRef<(data: any) => void>()

    const updateState = useCallback(
        (newState: any, callback: (data: any) => void) => {
            callbackRef.current = callback

            setState((prev: any) =>
                typeof newState === 'function' ? newState(prev) : newState
            )
        },
        []
    )

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state)
            callbackRef.current = null
        }
    }, [state])

    return [state, updateState]
}

export default useStateWithCallback
