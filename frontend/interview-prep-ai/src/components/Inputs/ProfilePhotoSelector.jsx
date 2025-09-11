import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const profilePhotoSelector = ({ image, setImage, preview, setPreview }) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file =  event.target.files[0];
        if(file){
            // Update the image state
            setImage(file);

            //Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview)
            }
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);

        if(setPreview){
            setPreview(null);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };
  return <div>ProfilePhotoSelector</div>;
};

export default profilePhotoSelector;
