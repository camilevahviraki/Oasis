import React, { useState } from 'react';
import ImageSilder from '../../../../reusable/images_slider/ImageSilder';

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
    }

    const decreaseQuantity = () => {
       if(newQuantity > 0){
          setQuantity(newQuantity - 1);
       }
    }

  return (
    <div className='store-items-item'>
    <div className='store-items-image-wrapper'>
      <ImageSilder imagesArray={items_images}/>
    </div>
    <div className='store-items-item-details'>
      <div>
        <h4>{mainName}</h4>
        <p>Price: {price}$</p>
        <p>Quantity: {newQuantity}</p>
      </div>

      <div className='store-items-item-details-buttons'>
        <button type='button' onClick={decreaseQuantity}>
          -
        </button>
        <p>{newQuantity}</p>
        <button type='button' onClick={increaseQuantity}>
          +
        </button>
      </div>
      <button style={{border: '1px solid gray', padding: '10px'}}>Delete</button>
    </div>
  </div>
  )
}

export default MyItem