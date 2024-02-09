import React, { useEffect, useState } from 'react'
import { ImgUploader } from '../ImgUploader'
import { ImageShortGalery } from '../stayDetailsCmps/ImageShortGalery';


export function SeventhPage({ onSetStay, stay }) {

    const [selectedImg, setSelectedImg] = useState(stay.imgUrls);

    useEffect(() => {
        onSetStay({ "imgUrls": selectedImg })
    }, [selectedImg])
    function onUploaded(imgUrl) {
        setSelectedImg(...selectedImg, imgUrl)
    }
    return (
        <section className="firstpage-edit fourthPage-edit sevenPage-edit">
            <div>
                <h3>Add some photos of your house</h3>
                <h5>You'll need 5 photos to get started. You can add more or make changes later.</h5>
            </div>
            {selectedImg.length ? <ImageShortGalery imgUrls={selectedImg} /> :
                <section className='roomtype-list' >
                    <ImgUploader onUploaded={onUploaded} />
                </section>}
        </section >
    )
}
