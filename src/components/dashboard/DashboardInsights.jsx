import { orderService } from "../../services/order.service"

export function DashboardInsights({orders}) {
  console.log("🚀 ~ DashboardInsights ~ orders:", orders)
  
  const revenue = orderService.getRevenueInsight(orders)
  const totalGuests = orderService.getGuestsInsight(orders)
  const averageDuration = orderService.getAverageBookingDuration(orders)

  return (
    <div>
      <div className="insight-card">
        <div className="insight-card-header">
            Total Revenue
        </div>
        <div className="insight-card-data">
            {revenue}
        </div>
      </div>
      <div className="insight-card">
        <div className="insight-card-header">
            Total guests
        </div>
        <div className="insight-card-data">
            {totalGuests}
        </div>
      </div>
      <div className="insight-card">
        <div className="insight-card-header">
            Average duration
        </div>
        <div className="insight-card-data">
            {averageDuration} Nights
        </div>
      </div>
    </div>
  )
}
