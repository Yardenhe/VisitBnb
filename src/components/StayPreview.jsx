import React from 'react'

export function StayPreview({ stay }) {
    return (
        <section>
            <div>{stay.name}</div>
            <div>{stay.type}</div>
            <div>{stay.price}</div>
        </section>
    )
}
