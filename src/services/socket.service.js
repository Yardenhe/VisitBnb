import io from 'socket.io-client'
import { userService } from './user.service'


export const SOCKET_EVENT_ORDER_ADDED = 'order-added'
export const SOCKET_EVENT_ORDER_UPDATED = 'order-updated'
export const SOCKET_EVENT_ORDER_FROM_YOU = 'order-from-you'
export const SOCKET_EVENT_ORDER_STATUS_CHANGE = 'order-status-change'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()


function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
            const user = userService.getLoggedinUser()
            if (user) this.login(user._id)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
        },

    }
    return socketService
}

