import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, saveOrder } from '../store/actions/order.actions'
import { OrderList } from '../components/OrderList'

export function OrderIndex() {
  const orders = useSelector(storeState => storeState.orderModule.orders)
  console.log("🚀 ~ OrderIndex ~ orders:", orders)
  const [orderToUpdate, setOrderToUpdate] = useState()

  useEffect(() => {
    loadOrders()
  }, [])

  const elLoader = <p>loading orders.. or am i loading orders?</p>
  if (!orders) return elLoader
  return (<>
    <div className='order-index'>
      <OrderList orders={orders} />
    </div>
  </>

  )
}

