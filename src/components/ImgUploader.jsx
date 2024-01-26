import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        setImgData({ imgUrl: secure_url, width, height })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Upload Another?'
        return isUploading ? 'Uploading....' : 'Upload Image'
    }

    return (
        <div className="upload-preview">
            {/* {imgData.imgUrl && <img src={imgData.imgUrl} className='upload-image' />} */}

            <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
            <div className='photo-uploader'>

                <div className='image-content' >
                    <img src="/public/img/general-icons/photos-icon.svg" className='svg-upload' />
                    <h5 htmlFor="imgUpload">{getUploadLabel()}</h5>
                </div>
            </div>
        </div>
    )
}