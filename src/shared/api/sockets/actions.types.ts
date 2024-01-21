export enum SocketEvent {
    Join = 'Join',
    Leave = 'Leave',
    GetRooms = 'GetRooms',
    OnMessage = 'OnMessage',
    AddPeer = 'AddPeer',
    RemovePeer = 'RemovePeer',
    RelaySDP = 'RelaySDP',
    RelayICE = 'RelayICE',
    SESSION_DESCRIPTION = 'SessionDescription',
    ICE_CANDIDATE = 'ICE_CANDIDATE',
    BroadcastMessage = 'BroadcastMessage'
}

export type SocketMessage = {
    event: SocketEvent
    data?: any
}
