import { PieChart } from '@mui/x-charts/PieChart';
import { orderService } from '../../services/order.service';
import { useState } from 'react';

export function PieCharts({ orders }) {
    // use state to manage the chart data 
    const [selectedTab, setSelectedTab] = useState('guests');
    const { guestPieData, otherPieData } = orderService.getOrdersInsightsPie(orders);

    const pieData = getSelectedTab(selectedTab)

    function getSelectedTab(tab) {
        switch (tab) {
            case 'guests':
                return [
                    {
                        data: guestPieData,
                    },
                ]
            case 'other':
                return [
                    {
                        data: otherPieData,
                    },
                ]
            default:
                break;
        }
    }



    return (<>
        <div className="pie-chart-tabs">
            {/* use indicator for selected tab and an onclick event handeling */}
            <button className={(selectedTab === 'guests') ? 'selected' : ''} onClick={() => setSelectedTab('guests')}>guests</button>
            <button className={(selectedTab === 'other') ? 'selected' : ''} onClick={() => setSelectedTab('other')}>other</button>

        </div>
        <PieChart
            series={pieData}
            width={600}
            height={250}
        />
    </>
    )
}


