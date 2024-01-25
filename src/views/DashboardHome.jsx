import { useEffect } from "react"
import { loadOrders } from "../store/actions/order.actions"
import { OrderList } from "../components/OrderList"
import { useSelector } from "react-redux"
import { DashboardInsights } from "../components/dashboard/DashboardInsights"
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom"
import { saveOrder } from "../store/actions/order.actions"

export function DashboardHome() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)




    useEffect(() => {
        const userToGetOrdersBy = { hostId: loggedInUser?._id }
        loadOrders(userToGetOrdersBy)
    }, [])


    async function onSaveOrder(order) {
        try {
            await saveOrder(order)
            console.log("🚀 ~ DashboardHome ~ orders:", orders)
        } catch (err) {
            console.log('Had issues adding order', err);
        }
    }
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
                context={{ loggedInUser, orders, onSaveOrder }} />
        </div>
    </>

    )
}

