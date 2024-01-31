import { useRef, useState } from 'react';
import { uploadService } from '../services/upload.service';

export function ImgUploader({ onUploaded = null }) {
    const [imgData, setImgData] = useState({
        imgUrl: [],
        height: 500,
        width: 500,
    });
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef();

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
            console.error('Failed to upload', err);
            setIsUploading(false);
        }
    }

    function getUploadLabel() {
        if (imgData.imgUrl.length > 0) return 'Upload Another?';
        return isUploading ? 'Uploading....' : 'Upload Image';
    }

    const handleDivClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="upload-preview">
            <input
                type="file"
                onChange={uploadImg}
                accept="image/*"
                id="imgUpload"
                multiple
                ref={inputRef}
                style={{ display: 'none' }}
            />
            <div className="photo-uploader" onClick={handleDivClick}>
                <div className="image-content">
                    <img src="../img/general-icons/photos-icon.svg" className="svg-upload" />
                    <h5 htmlFor="imgUpload">{getUploadLabel()}</h5>
                </div>
            </div>
        </div>
    );
}