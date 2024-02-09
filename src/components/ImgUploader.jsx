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
        setIsUploading(true);
        const files = Array.from(ev.target.files);

        try {
            const uploadPromises = files.map(async (file) => {
                const { secure_url, height, width } = await uploadService.uploadImg(file);
                return { imgUrl: secure_url, width, height };
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setImgData((prevImgData) => ({
                ...prevImgData,
                imgUrl: [...prevImgData.imgUrl, ...uploadedImages.map((img) => img.imgUrl)],
            }));
            setIsUploading(false);

            onUploaded && onUploaded(uploadedImages.map((img) => img.imgUrl));
        } catch (err) {
            console.error('Failed to upload', err)
            setIsUploading(false);
        }
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Upload Another?'
        return isUploading ? 'Uploading....' : 'Upload Image'
    }


    return (
        <div className="upload-preview">
            {/* {imgData.imgUrl && <img src={imgData.imgUrl} className='upload-image' />} */}

            <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" multiple />
            <div className='photo-uploader'>

                <div className='image-content' >
                    <img src="../img/general-icons/photos-icon.svg" className='svg-upload' />
                    <h5 htmlFor="imgUpload">{getUploadLabel()}</h5>
                </div>
            </div>
        </div>
    )
}