import { useEffect, useState } from "react"


const LazyLoadedImg = ({ className, src, alt }) => {
    // Simulate a delay in loading the image (you can replace this with your actual image URL)
    const [imageUrl, setImageUrl] = useState(src)


    // Imagine if it was a gallery!
    if (!imageUrl) return <></>
    return <>
        <img className={className} src={imageUrl} alt="Img" />
    </>
}

export default LazyLoadedImg