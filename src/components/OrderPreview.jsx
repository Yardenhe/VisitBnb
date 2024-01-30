import React, { useEffect, useState } from 'react'
import { stayService } from '../services/stay.service'
import { utilService } from '../services/util.service';
import { GiConfirmed } from "react-icons/gi";
import { FaRegClock } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
// import { SOCKET_EVENT_ORDER_ADDED, SOCKET_EVENT_ORDER_UPDATED, socketService } from '../services/socket.service';
// import { ADD_ORDER, UPDATE_ORDER } from '../store/reducers/order.reducer';
// import { store } from '../store/store';

export function OrderPreview({ order }) {
    const [stayOrder, setStayOrder] = useState();



    useEffect(() => {
        loadStay()

    }, [])

    async function loadStay() {
        const stay = await stayService.getById(order.stay._id)
        console.log("🚀 ~ OrderPreview ~ stayOrder:", stay)
        setStayOrder(stay)
    }
    function checkIconByTitle(title) {
        switch (title) {
            case 'approved':
                return (<GiConfirmed />);
            case 'rejected':
                return (<MdCancel />);
            case 'pending':
                return (<FaRegClock />);
            default:
                break;
        }
    }
    if (!stayOrder) return <div className="">Loading...</div>
    return (
        <article className='order-preview'>
            <img className='img-preview-orders' alt='img' src={stayOrder.imgUrls[0]} />
            <section className='order-preview-detiels'>
                <div>
                    <div className='sub-text bold'>{stayOrder.loc.city}</div>
                    <div className='sub-text'>Hosted by {stayOrder.host.fullname}</div>
                    <span className='sub-text'>
                        {utilService.formatOrderDate(order.startDate) + " - " + utilService.formatOrderDate(order.endDate)}
                    </span>
                </div>
                <div className={`status-label ${utilService.checkClassNameByTitle(order.status)}`}>
                    {checkIconByTitle(order.status)}
                    <span>{"   " + order.status}</span>
                </div>


            </section>

        </article >
    )
}
