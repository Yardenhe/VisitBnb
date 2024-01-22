import React from 'react'

export function TenthPage() {
    return (
        <section className='center'>
            <section className="firstpage-edit fourthPage-edit eighth-page">
                <div>
                    <h3>Now, set your price</h3>
                    <h4>You can change it anytime.</h4>

                </div>

                <section className='price-box' >
                    <span>₪</span>
                    <input
                        type="number"
                        placeholder='256'

                    />

                </section>

            </section >
        </section>
    )
}
