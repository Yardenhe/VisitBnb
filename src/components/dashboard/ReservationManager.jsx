import { useOutletContext } from "react-router"
import { utilService } from "../../services/util.service"
import { useState } from "react";

export function ReservationManager() {
  const [selectedOrder, setSelectedOrder] = useState(false)
  const openMiniModal = (order) => {
    setSelectedOrder(!selectedOrder)
  };
  const { orders } = useOutletContext()
  return (
    <div className="dashboard-reservations">
      <h3>Reservations</h3>
      <table className="orders-table ">
        <thead>
          <tr>
            <th>Status</th>
            <th>Guests</th>
            <th>Dates</th>
            <th>Booked Stay</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} onClick={() => openMiniModal(order)}>
              <td>{order.status}</td>
              <td>
                <h4>{`${order.buyer.fullname}`}</h4>
                <h5>{`${order.guests.adults} Adults  ${order.guests.kids ? order.guests.kids + 'Kids' : ''} `}</h5>
              </td>
              <td>
                <h4>{`${utilService.formatDate(order.startDate)} - ${utilService.formatDate(order.endDate)}`}</h4>
                <h5>{utilService.calculateNightsBetweenDates(order.startDate, order.endDate)} night</h5>
              </td>
              <td>{order.stay.name}</td>
              <td>{`${order.totalPrice} ₪`}</td>
              <td>...</td>
              {selectedOrder && <td className={`mini-modal ${selectedOrder ? 'open' : ''}`}>
                <p>Approve</p>
                <p>Reject</p>
              </td>}
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  )
}
