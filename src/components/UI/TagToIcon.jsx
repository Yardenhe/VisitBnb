
export function TagToIcon({tag,className}) {
    // console.log(tag);
    // for some reason doesnt work without the public 
    const iconPath = `/public/img/icons/${tag}.svg`
  return (
    <img src={iconPath} className={`generic-icon ${className}`}></img>
    )
}
