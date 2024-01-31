import { GiConfirmed } from "react-icons/gi"
import { eventBus, showSuccessMsg } from "../../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { SOCKET_EVENT_ORDER_FROM_YOU, SOCKET_EVENT_ORDER_STATUS_CHANGE, socketService } from "../../services/socket.service.js"


export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', (msg) => {

            setMsg(msg)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 19000)
        })

        socketService.on(SOCKET_EVENT_ORDER_FROM_YOU, (order) => {
            showSuccessMsg(`New order waiting for you! `)
        })
        socketService.on(SOCKET_EVENT_ORDER_STATUS_CHANGE, (order) => {
            showSuccessMsg(`Your order was approved! `)
        })

        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_ORDER_FROM_YOU)
            socketService.off(SOCKET_EVENT_ORDER_STATUS_CHANGE)
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        <section className={`user-msg ${msg.type}`}>
            <div className="flex center">
                {msg.type == 'success' && <GiConfirmed />}
                {msg.txt}
            </div>
            {/* <button onClick={closeMsg}>x</button> */}
        </section>
    )
}