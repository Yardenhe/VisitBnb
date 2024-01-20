import React from 'react'

export function AmeintyModal({ payload }) {
    const { amenities } = payload
    console.log("🚀 ~ AmeintyModal ~ amenities:", amenities)


    return (
        <div className="amenity-modal">
            <h3>Amenities</h3>
            <div className="amenity-modal-list">
                {amenities.map(a=>(<div key={a} className="amenity-name">{a}</div>))}
            </div>

        </div>
    )
}
