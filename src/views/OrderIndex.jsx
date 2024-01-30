import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, saveOrder } from '../store/actions/order.actions'
import { OrderList } from '../components/OrderList'

export function OrderIndex() {
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const orders = useSelector(storeState => storeState.orderModule.orders)
  console.log("🚀 ~ OrderIndex ~ orders:", orders)
  // const [orderToUpdate, setOrderToUpdate] = useState()

  const userToGetOrdersBy = { buyer: loggedInUser._id }

  useEffect(() => {
    loadOrders(userToGetOrdersBy)
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

