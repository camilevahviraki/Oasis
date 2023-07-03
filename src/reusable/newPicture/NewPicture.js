import React, { useState } from 'react';
// import splashImage from "../../images/store-image-holder.png";
import inputFileIcon from '../../images/input-file.png';

const NewPicture = (props) => {
  const { uploadNewPicture, splashImage, getGallery } = props;
  const [gallery, setGallery] = useState([]);

  const handlePreview = (e) => {
    getGallery(Array.prototype.slice.call(e.target.files));
    setGallery(Array.prototype.slice.call(e.target.files));
  };

  return (
    <div className="new-picture-container">
      <div className="create-store-images-preview">
        {gallery.length === 0 ? (
          <img src={splashImage} alt="" />
        ) : (
          Object.keys(gallery).map((keyName) => (
            <div className="create-store-image-preview-container" key={keyName}>
              {gallery[keyName].type.includes('image') ? (
                <img
                  src={URL.createObjectURL(gallery[keyName])}
                  alt=""
                  className="create-store-image-preview"
                />
              ) : (
                <video width="400px" controls>
                  <source src={URL.createObjectURL(gallery[keyName])} />
                </video>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={uploadNewPicture} className="form-create-store-pictures">
        <label
          htmlFor="create-store-image"
          className="create-store-label-input-file"
        >
          Select Images or Video
          <img src={inputFileIcon} alt="" className="input-file-icon" />
          <input
            type="file"
            id="create-store-image"
            name="gallery"
            accept="image/*, video/*"
            onChange={handlePreview}
            className="create-store-image-input"
            multiple
          />
        </label>
        {/*
        <input
          type="text"
          name="pictures-description"
          placeholder={`short description`}
          onChange={(e) => setCurrentDescription(e.target.value)}
          value={currentDescription}
        /> */}

        <div>
          <input type="submit" value="Upload" className="create-store-submit" />
        </div>
      </form>
    </div>
  );
};

export default NewPicture;
