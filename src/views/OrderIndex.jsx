import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, saveOrder } from '../store/actions/order.actions'
import { OrderList } from '../components/OrderList'
import { SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_UPDATED, socketService } from '../services/socket.service'
import { store } from '../store/store'
import { ADD_ORDER, UPDATE_ORDER } from '../store/reducers/order.reducer'

export function OrderIndex() {
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const userToGetOrdersBy = { buyer: loggedInUser._id }

  useEffect(() => {
    loadOrders(userToGetOrdersBy)
  }, [])


  useEffect(() => {

    socketService.on(SOCKET_EVENT_ORDER_UPDATED, (order) => {
      store.dispatch({ type: UPDATE_ORDER, order: order })
    })
    socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
      store.dispatch({ type: ADD_ORDER, order: order })
    })
    return () => {
      socketService.off(SOCKET_EVENT_ORDER_UPDATED)
      socketService.off(SOCKET_EVENT_ORDER_ADDED)
    }
  }, [])

  const elLoader = <p>loading orders.. or am i loading orders?</p>
  if (!orders) return elLoader
  return (

    <div className='order-index'>
      <h3 className='order-title bold'>Trips</h3>

      <OrderList orders={orders} />

    </div>


  )
}

