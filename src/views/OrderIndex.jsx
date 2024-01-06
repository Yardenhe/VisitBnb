import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, saveOrder } from '../store/actions/order.actions'
import { Link } from 'react-router-dom'

export function OrderIndex() {
    const orders = useSelector(storeState=>storeState.orderModule.orders)
    const [orderToUpdate,setOrderToUpdate] = useState(orders[0])

    useEffect(()=>{
        loadOrders()
    },[])

    // function handleStatusChange(){

    // } 

    const elDevActions = 
      <div className="dev-actions">
        <button onClick={()=>loadOrders()}>LoadOrders</button>

        <button onClick={()=>console.log(orders)}>LOG all ORDERS</button>

        <button onClick={()=>saveOrder(orderToUpdate)}>placeOrder (save)</button>

      </div>
  const elLoader = <p>loading orders.. or am i loading orders?</p>
    // if (!orders) return elLoader
    console.log('orders from OrderIndex',orders);
  return (<>
  <div className="orders-list-actions">
    {elDevActions}
  </div>
    <div className='order-list'>
      {(!orders) ? elLoader :
      (orders.map((order)=> (
      <li key={order.id}>
        <div className={`list-order-row`}>
          {Object.entries(order).map(([key,value])=>(
              <div className="list-order-row-pair">
                  <div className="list-order-row-key">{key}:</div>
                  <div className="list-order-row-value">
                  {
                    (typeof value === 'object') 
                    ? 
                    Object.values(value).toLocaleString()
                    : 
                    value 
                  }
                  </div>
              </div>
            ))}
              </div>
        </li>)))
                }
    </div>
  </>

  )
}


// for deeper nested info:
                    // Object.entries(value).map(([subKey,subValue])=>(
                    //   subKey[].toString()
                      // (typeof subValue === 'object')
                      // ?
                      // <Link>{subKey}</Link>
                      // :
                      // console.log('subValue:',subValue)
                      // ))