import React, { useState, useEffect } from 'react'

export function ElevenPage({ onSetStay, stay }) {
    const [selectedPrice, setSelectedPrice] = useState(stay.price);
    useEffect(() => {
        onSetStay({ "price": selectedPrice })
    }, [selectedPrice])
    return (
        <section className='center'>
            <section className="firstpage-edit fourthPage-edit eighth-page">
                <div>
                    <h3>Review your listing</h3>
                    <h4>Here's what we'll show to guests. Make sure everything looks good.</h4>

                </div>

                <section className='stay-submit-preview' >
                    <section>
                        <img src={stay.imgUrls[0]} alt='img' />

                    </section>
                    <section className='stay-submit-text' >
                        <h3>{stay.name}</h3>
                        <div className='elpsis'> <h4 >{stay.summary}</h4></div>
                        <h5>{stay.loc.city} {","}{stay.loc.country}</h5>
                        <h5>{stay.loc.street} {" "}{stay.loc.streetNum}</h5>
                        <h4>{stay.price}₪</h4>

                    </section>


                </section>

            </section >
        </section>
    )
}
