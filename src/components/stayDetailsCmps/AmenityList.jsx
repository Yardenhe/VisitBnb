import { TagToIcon } from "../UI/TagToIcon"

export function AmenityList({amenities}) {
    const totalAmenities = amenities.length
    const shortAmenities = amenities.slice(0,4)
  return (
    <>
    <h4>What this place offers</h4>
    <div className="amenity-list">
        {shortAmenities.map((amenity,i)=>
        <div className='amenity' key={i}>
            <TagToIcon tag={amenity} className={'amenity-icon'}/>
            <div className="amenity-name">
              {amenity}
            </div>
        </div>)}
        <button onClick={()=>console.log(amenities)} className="commun-btn">Show all {totalAmenities} amenities</button>
    </div>
    </>  
  )
}
