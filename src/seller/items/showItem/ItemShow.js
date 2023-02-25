import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSliderItem from "../../../reusable/images_slider_item/ImageSliderItem";
import { getItem } from "../../../redux/item/itemShow";
import LimitText from "../../../reusable/limit-text-length/limitText";
import "./ItemShow.css";

const ItemShow = () => {
  const dispatch = useDispatch();
  const itemId = useSelector((state) => state.itemLinkReducer);

  useEffect(() => {
    const itemData = {
      id: itemId.itemId,
      store_id: "azerty",
    };
    dispatch(getItem(itemData));
  }, []);
  const item = useSelector((state) => state.getItemDetails);

  const {
    created_at,
    currency,
    id,
    item_categories,
    items_images,
    mainName,
    names,
    description,
    price,
    quantity,
    store_id,
    updated_at,
  } = item;

  console.log(item);
  return (
    <div className="item-show-container">
      <div className="item-show-wrapper">
        <div className="item-show-images-container">
          {items_images ? (
            <ImageSliderItem imagesArray={items_images} />
          ) : (
            <></>
          )}
        </div>
        <div className="item-show-details">
          <h4>{mainName}</h4>
          <div className="item-show-details-container">
            <div className="item-show-details-attributes-container">
              <>
                <p>Color:</p>
                <div className="item-show-details-attributes-wrapp">
                  {[1, 2, 3, 4].map((attribute) => (
                    <div className="item-show-details-attribute">
                      {attribute}
                    </div>
                  ))}
                </div>
              </>
              <>
                <p>Size:</p>
                <div className="item-show-details-attributes-wrapp">
                  {["XL", "XXL", "L"].map((attribute) => (
                    <div className="item-show-details-attribute">
                      {attribute}
                    </div>
                  ))}
                </div>
              </>
              <>
                <p>Quantity:</p>
                <div className="item-show-details-attributes-wrapp">
                  <button>{"+"}</button>
                  {quantity}
                  <button>{"+"}</button>
                </div>
              </>
            </div>
          </div>
          <div className="add-to-cart-button-wrapp">
               <button className="add-to-cart-button">Add To cart</button>
            </div>
          <div>
            <LimitText limit={250} text={description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemShow;
