import { SocketEvent, SocketMessage } from '@/shared/api'

const socketURL = 'ws://192.168.65.67:3001'

let socketInstance = new WebSocket(socketURL)

export function useSocket(url = socketURL) {
    let instance: WebSocket
    connect()

    function connect(callback?: () => void) {
        if (socketInstance) {
            instance = socketInstance
        } else {
            instance = new WebSocket(url)
            socketInstance = instance
        }

        if (callback) {
            instance.onopen = () => {
                callback()
            }
        }
    }

    function sendMessage(data: SocketMessage) {
        if (instance.readyState) {
            instance.send(JSON.stringify(data))
        } else {
            connect()
            instance.onopen = () => {
                sendMessage(data)
            }
        }
    }

    function onMessage(
        event: SocketEvent,
        callback: (message: SocketMessage) => void,
        options: AddEventListenerOptions = {}
    ) {
        instance.addEventListener(
            'message',
            (message) => {
                const response = parseMessage(message)

                if (response.event === event) callback(response)
            },
            options
        )
    }

    function parseMessage(message: MessageEvent): SocketMessage {
        const response = JSON.parse(message.data)

        return {
            event: response?.event as SocketEvent,
            data: response?.data
        }
    }

    return { sendMessage, parseMessage, onMessage, instance, connect }
}
