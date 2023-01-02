import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStoreProgress } from "../../../redux/stores/createStoreReducer";
import locationIcon from '../../../images/location_icon.png';
import "./css/CreateStorePreview.css";

const CreateStorePreview = (props) => {
  const dispatch = useDispatch();
  const createStoreData = useSelector((state) => state.createStoresReducer);
  const { details, pictures, types, places, progress } = createStoreData;
  return (
    <div
      style={props.progress === 5 ? { display: "grid" } : { display: "none" }}
    >
      <div className="create-store-preview-description">
        <h3>Store details</h3>
        <div className="create-store-preview-description-location">
          <h4>Name: {details.name}</h4>  
          <h4>Location:</h4>
          <p>
            {details.city}, {details.country}
          </p>
        </div>
        <div className="create-store-preview-description-details">
          <p>{details.description}</p>
        </div>
      </div>
      <div className="create-store-preview-pictures-container">
        <h3>Store Views</h3>
        <div className="create-store-preview-pictures">
          {pictures.map((gallery, key) => (
            <div className="create-store-preview-pictures-gallery row">
              {gallery.type === "image" ? (
                <div className="create-store-image-preview-container">
                  <img
                    src={URL.createObjectURL(gallery.images[0])}
                    alt=""
                    className="create-store-image-preview"
                  />
                </div>
              ) : (
                <video width="300px" controls>
                  <source src={URL.createObjectURL(gallery.images[0])} />
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="create-store-preview-categories-container">
           <h3>Item's Categories</h3>
           <div className="create-store-preview-categories row">
               {
                 types.map((category) => (
                    <div>
                        <h5>{category}</h5>
                    </div>
                 ))
               }
           </div>
      </div>
      <div className="create-store-preview-places-container">
        <h3>Others Locations</h3>
        <div className="create-store-preview-places row">
            <div>
                <img src={locationIcon} alt='' className="location-icon icon"/>
                Washington DC, USA
            </div>
            <div>
            <img src={locationIcon} alt='' className="location-icon icon"/>
                Casablanca, Morroco</div>
            <div>
            <img src={locationIcon} alt='' className="location-icon icon"/>
                Kinshasa, DRC</div>
            <div>
              <img src={locationIcon} alt='' className="location-icon icon"/>
                Bucharest, Romania </div>
        </div>
      </div>
      <div className="create-store-preview-submit-container row">
        <button type="button" onClick={() => dispatch(createStoreProgress())}>{'<'}Back</button>
        <button type="button">Create Store {'>'}</button>
      </div>
    </div>
  );
};

export default CreateStorePreview;
