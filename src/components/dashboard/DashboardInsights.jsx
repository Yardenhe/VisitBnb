import { orderService } from "../../services/order.service"

export function DashboardInsights({ orders }) {
  console.log("🚀 ~ DashboardInsights ~ orders:", orders)

  const {revenue,totalGuests,averageDuration} = orderService.getOrdersInsights(orders)
  const overview = orderService.getOverviewInsights(orders)
  console.log("🚀 ~ DashboardInsights ~ overview:", overview)

  function checkClassNameByTitle(title){
   switch (title) {
    case 'Approved':
      return 'approved-green'
    case 'Canceled':
      return 'canceled-red'
    case 'Pending':
      return 'pending-orange'
    default:
      break;
   }
  }

  return (
    <div className="insights-container">
      <div className="insight-card">
        <div className="insight-card-header">
          Total Revenue
        </div>
        <div className="insight-card-data">
          <div className="insight-number">
            {revenue}
          </div>
        </div>
      </div>

      <div className="insight-card">
        <div className="insight-card-header">
          Total guests
        </div>
        <div className="insight-card-data">
          <div className="insight-number">
            {totalGuests}
          </div>
        </div>
      </div>

      <div className="insight-card">
        <div className="insight-card-header">
          Average duration
        </div>
        <div className="insight-card-data">
          <div className="insight-number">
            {averageDuration}
          </div>
          Nights
        </div>
      </div>

      {/* side-insight */}
      <div className="insight-card insight-long">
        <div className="insight-card-header">
          Overview
        </div>
          <ul className="clean-list">
            {Object.entries(overview).map(([title, stats], i) =>
              <li key={i} className="overview-list-item">
                <div className={`overview-list-item-title `}>{title}</div>
                <div className={`overview-list-item-stats ${checkClassNameByTitle(title)}`}>{stats}</div>
              </li>)}
          </ul>
        </div>

      {/* large-insight */}
      <div className="insight-card insight-large">
        <div className="insight-card-header">
          Sales statistics
        </div>
        <div className="insight-card-graph">
        </div>
      </div>


    </div>
  )
}
