export interface ServerToClientEvents {
    serverMessage: (data: {
        senderId: string, 
        text: string, 
        classroomId: string
        teacherStudent: boolean
        role: string
    }) => void;
}

export interface ClientToServerEvents {
    clientMessage: (data: {
        senderId: string, 
        text: string, 
        classroomId: string
        teacherStudent: boolean
        role: string
    }) => void;
}