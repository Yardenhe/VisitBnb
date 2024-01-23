import { useEffect } from "react"
import { loadOrders } from "../store/actions/order.actions"
import { OrderList } from "../components/OrderList"
import { useSelector } from "react-redux"

export function Dashboard() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    const userToGetOrdersBy = {hostId:loggedInUser._id}

    useEffect(() => {
        loadOrders(userToGetOrdersBy)
    }, [])

    const elLoader = <p>loading orders.. or am i loading orders?</p>
    if (!orders) return elLoader

    return (<>
        <div className='order-index'>
        <h3 className='order-title bold'>Dashboard</h3>

            <OrderList orders={orders} />
        </div>
    </>

    )
}
