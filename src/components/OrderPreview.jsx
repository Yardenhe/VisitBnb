import React, { useEffect, useState } from 'react'
import { stayService } from '../services/stay.service'


export function OrderPreview({ order }) {
    const [stayOrder, setStayOrder] = useState();



    useEffect(() => { loadStay() }, [])

    async function loadStay() {

        const stay = await stayService.getById(order.stay._id)
        console.log("🚀 ~ OrderPreview ~ stayOrder:", stay)
        setStayOrder(stay)
    }
    if (!stayOrder) return <div className="">Loading...</div>
    return (
        <article className='order-preview'>
            <img className='img-preview-orders' alt='img' src={stayOrder.imgUrls[0]} />
            <section>
                <div className='sub-text'>{stayOrder.loc.city}</div>
                <div className='sub-text'>{stayOrder.host.fullname}</div>
                <div className='sub-text'>{order.endDate}</div>
                <div className='sub-text'>{order.startDate}</div>
            </section>

        </article>
    )
}
