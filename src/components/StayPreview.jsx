import React from 'react'

export function StayPreview({ stay }) {
    return (
        <section className='stay-preview'>
            <img className='img-preview' src={stay.imgUrls[0]} alt='img' />
            <div className='preview-loc'>{stay.loc.city},{stay.loc.country}</div>
            <div className='preview-name'>{stay.name}</div>
            <div>{stay.price}$ night</div>
        </section>
    )
}
