import { useState } from "react"

export function TagToIcon({tag , className = ''}) {
    const [iconPath,setIconPath] = useState(`/public/img/icons/${tag}.svg`)
    // console.log(tag);
    // for some reason doesnt work without the public 
    // const iconPath = `/public/img/icons/${tag}.svg`
    
    function HandleSvgError(){
      setIconPath(`/public/img/icons/piano.svg`)
    }

  return (
    <img onError={HandleSvgError} src={iconPath} className={`generic-icon ${className}`}/>
    )
}
