import { useState } from "react"

export function TagToIcon({ tag, className = '' }) {
  const basePath1 = `/public/img/amenity-icons/${tag}.svg`;
  const basePath2 = `/public/img/general-icons/${tag}.svg`;
  const fallBackPath = `/public/img/amenity-icons/Piano.svg`;

  const [iconPath, setIconPath] = useState(basePath1)

  function HandleSvgError() {
    if (iconPath === basePath1) {
      setIconPath(basePath2)
    } else {
      setIconPath(fallBackPath)
    }
  }

  return (
    <img onError={HandleSvgError} src={iconPath} className={`generic-icon ${className}`} />
  )
}
const amenities = [
  "TV",
  "Cable TV",
  "Internet",
  "Wifi",
  "Air conditioning",
  "Pool",
  "Kitchen",
  "Free parking on premises",
  "Elevator",
  "Free street parking",
  "Family/kid friendly",
  "Washer",
  "Dryer",
  "Smoke detector",
  "First aid kit",
  "Essentials",
  "Hangers",
  "Hair dryer",
  "Iron",
  "Laptop friendly workspace",
  "Self check-in",
  "Lockbox",
  "Babysitter recommendations",
  "Hot water",
  "Bed linens",
  "Extra pillows and blankets",
  "Microwave",
  "Coffee maker",
  "Refrigerator",
  "Dishwasher",
  "Dishes and silverware",
  "Cooking basics",
  "Oven",
  "Stove",
  "Single level home",
  "BBQ grill",
  "Patio or balcony",
  "Garden or backyard",
  "Beach essentials",
  "Long term stays allowed",
  "Wide hallway clearance",
  "Step-free access",
  "Wide doorway",
  "Flat path to front door",
  "Well-lit path to entrance",
  "Disabled parking spot",
  "Waterfront",
  "Beachfront",
]
