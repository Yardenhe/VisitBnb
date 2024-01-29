import React, { useState, useEffect } from 'react'
import { onToggleModal } from '../../store/actions/app.actions';


export function TenthPage({ onSetStay, stay }) {
    const [selectedPrice, setSelectedPrice] = useState(stay.price);
    useEffect(() => {
        onSetStay({ "price": selectedPrice })
    }, [selectedPrice])
    return (
        <section className='center'>
            <section className="firstpage-edit fourthPage-edit eighth-page tenthPage-edit">
                <div>
                    <h3>Now, set your price</h3>
                    <h4>You can change it anytime.</h4>

                </div>

                <section className='price-box' >
                    <span>₪</span>
                    <input
                        value={selectedPrice}
                        type="number"
                        placeholder='256'
                        onChange={(e) => setSelectedPrice(e.target.value)}
                    />

                </section>

            </section >
        </section>
    )
}
