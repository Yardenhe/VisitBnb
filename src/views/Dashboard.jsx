import { useEffect } from "react"
import { loadOrders } from "../store/actions/order.actions"
import { OrderList } from "../components/OrderList"
import { useSelector } from "react-redux"
import { DashboardInsights } from "../components/dashboard/DashboardInsights"

export function Dashboard() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    const userToGetOrdersBy = { hostId: loggedInUser._id }

    useEffect(() => {
        loadOrders(userToGetOrdersBy)
    }, [])

    const elLoader = <p>loading orders.. or am i loading orders?</p>
    if (!orders) return elLoader

    return (<>
        <div className='dashboard-layout'>
            <h3 className='dashboard-header'>Welcome,{loggedInUser.fullname.split(' ')[0]}!</h3>
            <section className="dashboard-section">
                <div className="dashboard-title">
                    <h3>Your reservations</h3>
                </div>
                <OrderList orders={orders} />
            </section>
            <section className="dashboard-section">
                <div className="dashboard-title">
                    <h3>Some insights</h3>
                </div>
                <DashboardInsights orders={orders} />
            </section>
        </div>
    </>

    )
}
