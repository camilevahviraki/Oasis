import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../../../redux/upload";
import UploadProgress from "../../../reusable/upload-progress/UploadProgress";
import {
  addStorePictures,
  createStoreProgress,
  getStoreId
} from "../../../redux/stores/createStoreReducer";
import "./css/CreateStorePictures.css";

const CreateStorePictures = (props) => {
  const [currentDescription, setCurrentDescription] = useState("");
  const [gallery, setGallery] = useState([]);
  const [fyleType, setFileType] = useState("image");
  const [multiple, setMultiple] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const getProgress = (prog) => {
    setProgress(prog);
  }

  const userData = useSelector(state => state.authenticationReducer); 
  const storeData = useSelector(state => state.createStoresReducer);
  const token = userData.token;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formData = new FormData()
    gallery.forEach(img => {
      formData.append("images[]", img)
    })
    formData.append("step", 3)
    formData.append('store_id', storeData.storeId.store_id)
    formData.append('fyle_type', fyleType);
    formData.append('user_id', userData.user.id);
    Upload({
      endPoint: 'api_stores',
      data: formData,
      dispatchResponse: (sent) => dispatch(getStoreId(sent)),
      getProgress: (prog) => getProgress(prog)
    })
    dispatch(addStorePictures(formData, token));
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
    setGallery(Array.prototype.slice.call(e.target.files));
  };

  return (
    <div
      className="create-store-pictures"
      style={props.progress === 3 ? { display: "grid" } : { display: "none" }}
    >
      <div>
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
        <div style={{width: '300px'}}>
          <UploadProgress progress={progress}/>
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
