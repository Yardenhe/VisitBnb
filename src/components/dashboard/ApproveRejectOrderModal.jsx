import React, { useEffect, useState } from 'react'
import { utilService } from '../../services/util.service'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { stayService } from '../../services/stay.service'

export function ApproveRejectOrderModal({ payload, onCloseModal }) {
    const { order, onSaveOrder } = payload
    const [orderToUpdate, setOrderToUpdate] = useState(order)
    const [stayOrder, setStayOrder] = useState();

    useEffectUpdate(() => {
        try {
            onSaveOrder(orderToUpdate)
            onCloseModal()
        } catch (err) {
            console.log('Had issues adding order', err);
        }
    }, [orderToUpdate])
    useEffect(() => { loadStay() }, [])
    function onSetApprove() {
        setOrderToUpdate({ ...orderToUpdate, status: 'approved' })

    }
    function onSetReject() {
        setOrderToUpdate({ ...orderToUpdate, status: 'rejected' })
    }
    async function loadStay() {
        const stay = await stayService.getById(order.stay._id)
        setStayOrder(stay)
    }
    if (!stayOrder) return <div className="">Loading...</div>
    return (
        <section className='approve-reject-order-modal' >
            <h3 className='title'>Order details</h3>
            <section className='stay-submit-preview' >
                <section className='flex'>
                    <img className='img-preview-orders' alt='img' src={stayOrder.imgUrls[0]} />
                    <section className='stay-submit-text' >
                        <h4>{`${order.buyer.fullname}`}</h4>
                        <h5>{`${order.guests.adults} Adults  ${order.guests.kids ? order.guests.kids + ' Kids' : ''} `}</h5>
                        <h5 className='sub-text bold'>{stayOrder.loc.city} , {stayOrder.loc.country}</h5>
                        <h4>{`${utilService.formatDate(order.startDate)} - ${utilService.formatDate(order.endDate)}`}</h4>
                        <h5>{utilService.calculateNightsBetweenDates(order.startDate, order.endDate)} night</h5>
                        <h4>{order.totalPrice}₪</h4>

                    </section>
                </section>
                <section className='apprej-buttons'>
                    <button onClick={() => onSetApprove()}>Approve</button>
                    <button onClick={() => onSetReject()}>Reject</button>
                </section>

            </section>
        </section>
    )
}
