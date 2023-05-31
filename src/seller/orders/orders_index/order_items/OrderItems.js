import React from "react";

const OrderItems = (props) => {
  const { orderItems } = props;
  return (
    <div className="order-index-items-wrapper">
      {orderItems.map((orderItem, key) => {
        const { item } = orderItem;
        const { description, items_images } = item;
        const image0 = items_images.filter(image => image.includes('image/upload/'))[0]
        return(
           <div className={`order-index-item-image-wrapper order-image${key + 1}`} key={description}>
             <img src={image0} alt="" className="order-index-item-image" />
           </div> 
          )
      })}
    </div>
  );
};

export default OrderItems;
