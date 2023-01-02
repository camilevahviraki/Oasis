import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addStorePictures,
  createStoreProgress,
} from "../../../redux/stores/createStoreReducer";
import "./css/CreateStorePictures.css";

const CreateStorePictures = (props) => {
  const [choosenFiles, setChoosenFiles] = useState([]);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentFiles, setCurrentFiles] = useState([]);
  const [gallery, setGallery] = useState({});
  const [fyleType, setFileType] = useState("image");
  const [multiple, setMultiple] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addStorePictures(choosenFiles));
  };

  const handleSelect = (e) => {
    const choosen = e.target.value;

    if (choosen === "Image") {
      setFileType("image");
      setMultiple(false);
    } else if (choosen === "Gallery") {
      setFileType("image");
      setMultiple(true);
    } else if (choosen === "Video") {
      setFileType("video");
      setMultiple(true);
    }
  };

  const handlePreview = (e) => {
    const currentImage = Array.prototype.slice.call(e.target.files);
    setGallery(e.target.files);
    setCurrentFiles(currentImage);
  };

  const saveSelectedImages = () => {
    setGallery([]);
    setCurrentDescription("");
    setChoosenFiles([
      ...choosenFiles,
      { description: currentDescription, images: currentFiles, type: fyleType },
    ]);
  };

  const removeImageSet = (description) => {
    const newChoosenFiles = choosenFiles.filter(
      (files) => files.description !== description
    );
    setChoosenFiles(newChoosenFiles);
  };

  return (
    <div
      className="create-store-pictures"
      style={props.progress === 3 ? { display: "grid" } : { display: "none" }}
    >
      <div>
        {choosenFiles.map((files) => (
          <div className="create-store-images-preview">
            {files.type === "image"
              ? Object.keys(files.images).map((keyName, i) => (
                  <div className="create-store-image-preview-container small">
                    <img
                      src={URL.createObjectURL(files.images[keyName])}
                      alt=""
                      className="create-store-image-preview"
                    />
                  </div>
                ))
              : Object.keys(files.images).map((keyName, i) => (
                  <video width="200px" controls>
                    <source src={URL.createObjectURL(files.images[keyName])} />
                  </video>
                ))}
            <h5>{files.description}</h5>
            <button
              type="button"
              onClick={() => removeImageSet(files.description)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="create-store-images-preview">
          {fyleType === "image"
            ? Object.keys(gallery).map((keyName, i) => (
                <div className="create-store-image-preview-container">
                  <img
                    src={URL.createObjectURL(gallery[keyName])}
                    alt=""
                    className="create-store-image-preview"
                  />
                </div>
              ))
            : Object.keys(gallery).map((keyName, i) => (
                <video width="400px" controls>
                  <source src={URL.createObjectURL(gallery[keyName])} />
                </video>
              ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-create-store-pictures">
        <select onChange={handleSelect}>
          <option value="Image">Image</option>
          <option value="Gallery">Gallery</option>
          <option value="Video">Video</option>
        </select>
        {multiple ? (
          <input
            type="file"
            id="gallery"
            name="gallery"
            accept={`${fyleType}/*`}
            onChange={handlePreview}
            multiple
          />
        ) : (
          <input
            type="file"
            id="gallery"
            name="gallery"
            accept={`${fyleType}/*`}
            onChange={handlePreview}
          />
        )}
        <input
          type="text"
          name="pictures-description"
          placeholder={`short ${fyleType}s description`}
          onChange={(e) => setCurrentDescription(e.target.value)}
          value={currentDescription}
        />

        <div>
          <button type="button" onClick={saveSelectedImages}>
            More pictures
          </button>

          <div className="row">
            <button
              type="button"
              onClick={() => dispatch(createStoreProgress())}
            >
              {"<"}Back
            </button>
            <input type="submit" value="Next" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateStorePictures;
