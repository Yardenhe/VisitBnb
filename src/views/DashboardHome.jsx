import { useEffect } from "react"
import { loadOrders } from "../store/actions/order.actions"
import { OrderList } from "../components/OrderList"
import { useSelector } from "react-redux"
import { DashboardInsights } from "../components/dashboard/DashboardInsights"
import { NavLink, Navigate, Outlet } from "react-router-dom"

export function DashboardHome() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    const userToGetOrdersBy = { hostId: loggedInUser._id }

    useEffect(() => {
        loadOrders(userToGetOrdersBy)
    }, [])

    const elLoader = <p>loading orders.. or am i loading orders?</p>
    if (!loggedInUser) return <h1>Please Log in</h1>
    if (!orders) return elLoader

    return (<>
        <div className='dashboard-layout'>
            <div className="dashboard-nav-inks">
                <NavLink to='/hosting/dashboard'>Dashboard</NavLink>
                <NavLink to='/hosting/reservations'>Reservations</NavLink>
                <NavLink to='/hosting/listings'>Listings</NavLink>
            </div>
            <Outlet
                context={{loggedInUser , orders}} />
        </div>
    </>

    )
}

