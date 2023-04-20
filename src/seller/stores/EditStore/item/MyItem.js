import React, { useState } from "react";
import ImageSilder from "../../../../reusable/images_slider/ImageSilder";
import "./MyItem.css";

const MyItem = (props) => {
  const {
    created_at,
    currency,
    id,
    item_categories,
    items_images,
    mainName,
    names,
    price,
    quantity,
    store_id,
    updated_at,
  } = props.itemData;

  const [newQuantity, setQuantity] = useState(quantity);

  const increaseQuantity = () => {
    setQuantity(newQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (newQuantity > 0) {
      setQuantity(newQuantity - 1);
    }
  };

  return (
    <div className="store-items-edit-item">
      <div className="store-items-edit-image-wrapper">
        <ImageSilder imagesArray={items_images} />
      </div>
      <div className="store-items-edit-item-details">
        <div className="store-items-edit-item-details">
          <div>
            <h4>{mainName}</h4>
            <p>
              Price:
              {price}$
            </p>
          </div>
          <div className="store-items-edit-item-details-buttons">
            <p>Quantity: </p>
            <button type="button" onClick={decreaseQuantity}>
              -
            </button>
            <p>{newQuantity}</p>
            <button type="button" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
        <div className="store-items-item-edit-button-wrapp">
          <button className="store-items-item-edit-button">Edit</button>
          <button className="store-items-item-delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MyItem;
