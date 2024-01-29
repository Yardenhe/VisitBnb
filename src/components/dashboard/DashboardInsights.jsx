import { orderService } from "../../services/order.service"
import { utilService } from "../../services/util.service"
import { BsMoonStarsFill as MoonIcon } from "react-icons/bs";
import { FaPeopleRoof as GuestsIcon } from "react-icons/fa6";
import { TbReportMoney as RevenueIcon } from "react-icons/tb";
import { PieCharts } from "./PieCharts";

export function DashboardInsights({ orders }) {
  console.log("🚀 ~ DashboardInsights ~ orders:", orders)

  const { revenue, totalGuests, averageDuration } = orderService.getOrdersInsights(orders)
  const overview = orderService.getOverviewInsights(orders)

  console.log("🚀 ~ DashboardInsights ~ overview:", overview)


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
          <div className="insight-icon">
            <RevenueIcon />
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
          <div className="insight-icon">
            <GuestsIcon />
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
          <div className="insight-icon">
            <MoonIcon />
          </div>
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
              <div className={`overview-list-item-stats ${utilService.checkClassNameByTitle(title)}`}>{stats}</div>
            </li>)}
        </ul>
      </div>

      {/* large-insight */}
      <div className="insight-card insight-large">
        <div className="insight-card-header">
          Your statistics
        </div>
        <div className="insight-card-graph">
          <PieCharts orders={orders}/>
        </div>
      </div>


    </div>
  )
}
