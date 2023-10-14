"use client";

import React, { useState } from "react";

const ImageUpload = ({ onChange, className, selectImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (onChange) {
      onChange(file);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden w-full"
        id="image-upload-input"
      />
      <label htmlFor="image-upload-input" className="cursor-pointer">
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-24 h-24 object-cover"
          />
        ) : (
          <div
            className={`${
              className ? className : " w-50 h-72"
            } border-dashed border border-gray-600 flex justify-center items-center`}
          >
            <span className="text-center">
              {" "}
              {selectImage ? selectImage : "Select Image"}
            </span>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUpload;
