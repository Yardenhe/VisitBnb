import React, { useState, useEffect } from 'react'

export function NinthPage({ onSetStay, stay }) {
    const [selectedSummary, setSelectedSummary] = useState(stay.summary);
    useEffect(() => {
        onSetStay({ "summary": selectedSummary })
    }, [selectedSummary])
    return (
        <section className='center'>
            <section className="firstpage-edit fourthPage-edit eighth-page tenthPage-edit">
                <div className='des-title'>
                    <h3>Create your description</h3>
                    <h5>Share what makes your place special.</h5>

                </div>
                <section className='roomtype-list' >
                    <textarea
                        value={selectedSummary}
                        onChange={(e) => setSelectedSummary(e.target.value)}
                    />
                </section>

            </section >
        </section>
    )
}
