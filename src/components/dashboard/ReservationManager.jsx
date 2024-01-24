import { useOutletContext } from "react-router"

export function ReservationManager() {
    const {orders} = useOutletContext()
  return (
    <div>
      Reservations
    </div>
  )
}
