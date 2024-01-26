import React, { useEffect, useState } from 'react'
import { ImgUploader } from '../ImgUploader'


export function SeventhPage({ onSetStay, stay }) {
    const [selectedImg, setSelectedImg] = useState(stay.imgUrls);
    useEffect(() => {
        onSetStay({ "imgUrls": selectedImg })
    }, [selectedImg])
    function onUploaded(imgUrl) {
        setSelectedImg([...selectedImg, imgUrl])
    }
    return (
        <section className="firstpage-edit fourthPage-edit sevenPage-edit">
            <div>
                <h3>Add some photos of your house</h3>
                <h5>You'll need 5 photos to get started. You can add more or make changes later.</h5>

            </div>
            <div className='image-grid'>
                {
                    selectedImg.map((image) => (


                        <img src={image} className='upload-image' />


                    ))

                }
            </div >

            < section className='roomtype-list' >
                <ImgUploader onUploaded={onUploaded} />

            </section>
        </section >
    )
}
