import React, { useState, useEffect } from 'react'



export function EighthPage({ onSetStay, stay }) {
    const [selectedTitle, setSelectedTitle] = useState(stay.name);
    useEffect(() => {
        onSetStay({ "name": selectedTitle })
    }, [selectedTitle])
    return (
        <section className='center'>
            <section className="firstpage-edit fourthPage-edit eighth-page tenthPage-edit">
                <div>
                    <h3>Now, let's give your apartment a title</h3>
                    <h4>Short titles work best. Have fun with it—you can always change it later.</h4>

                </div>
                <section className='roomtype-list' >
                    <textarea
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                    />
                </section>
            </section >
        </section>
    )
}
