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
