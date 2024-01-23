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
                        <img src="https://a0.muscache.com/im/pictures/3ecf9b60-50a1-4a8b-9aa5-7f7c9bd2defa.jpg?im_w:480" alt='img' />

                    </section>
                    <section className='stay-submit-text' >
                        <h3>{stay.name}</h3>
                        <h4>{stay.summary}</h4>
                        <h4>Location</h4>
                        <h4>{stay.price}₪</h4>

                    </section>


                </section>

            </section >
        </section>
    )
}
