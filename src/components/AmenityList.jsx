import React from 'react'

export default function AmenityList({amenities}) {
    const totalAmenities = amenities.length
    const shortAmenities = amenities.slice(0,4)
  return (
    <>
    <h4>What this place offers</h4>
    <div className="amenity-list">
        {shortAmenities.map((amenity,i)=>
        <div className='amenity' key={i}>
            {amenity}
        </div>)}
        <button onClick={()=>console.log(amenities)}>Show all {totalAmenities} amenities</button>
    </div>
    </>  
  )
}
