export const uploadService = {
    uploadImg
};

async function uploadImg(file) {
    const CLOUD_NAME = "dafkc3w9n";
    const UPLOAD_PRESET = "zygfr7km";
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    try {
        if (!file) {
            throw new Error('No file provided');
        }

        const formData = new FormData();
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('file', file);

        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        });

        const imgData = await res.json();
        console.log('imgData', imgData);

        return imgData;
    } catch (err) {
        console.error('Failed to upload', err);
        throw err;
    }
}