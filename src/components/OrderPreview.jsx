import React, { useEffect, useState } from 'react'
import { stayService } from '../services/stay.service'
import { utilService } from '../services/util.service';

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
                <div className='sub-text bold'>{stayOrder.loc.city}</div>
                <div className='sub-text'>Hosted by {stayOrder.host.fullname}</div>
                <span className='sub-text'>{utilService.formatOrderDate(order.startDate) + " - "}</span>
                <span className='sub-text'>{utilService.formatOrderDate(order.endDate)}</span>
            </section>

        </article>
    )
}
