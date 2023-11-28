import { useEffect, useState } from "react"


const LazyLoadedImg = () => {
    // Simulate a delay in loading the image (you can replace this with your actual image URL)
    const [imageUrl, setImageUrl] = useState('')
    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let prm = await fetch('https://yesno.wtf/api')
        const ans = await prm.json()
        setImageUrl(ans.image);
    }

    // Imagine if it was a gallery!
    if (!imageUrl) return <></>
    return <>
        <img src={imageUrl} alt="Lazy Loaded" />
    </>
}

export default LazyLoadedImg