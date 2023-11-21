import { Link, useOutletContext } from "react-router-dom";
import { ImageShortGalery } from "../components/ImageShortGalery";

export function StayDetails() {
    const {stayId} = useOutletContext()

    return (
        <>
            <Link to='/'>←back</Link>
            <div>StayDetails</div>
            <ImageShortGalery id={stayId}/>
        </>
    )
}
