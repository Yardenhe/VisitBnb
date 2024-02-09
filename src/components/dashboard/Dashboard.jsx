import { OrderList } from "../OrderList"
import { DashboardInsights } from "./DashboardInsights"
import { useOutletContext } from "react-router"

export function Dashboard() {
    const { orders, loggedInUser } = useOutletContext()

    return (<>
        <h3 className='dashboard-header'>Welcome,{loggedInUser.fullname.split(' ')[0]}!</h3>

        <section className="dashboard-section">
            <div className="dashboard-title">
                <h3>Your Listings insights</h3>
            </div>
            <DashboardInsights orders={orders} />
        </section>
        <section className="dashboard-section">
            <div className="dashboard-title">
                <h3>Your reservations</h3>
            </div>
            <div className="order-index">
                <OrderList orders={orders} />
            </div>
        </section>
    </>)
}
