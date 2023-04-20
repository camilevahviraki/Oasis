import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreLink } from "../../../../redux/storeLink/storeLinkReducer";
import { createNewCartItem } from "../../../../redux/cart/createCartReducer";
import linkName from "../../../../reusable/remove-blanck-space/linkName";
import ItemAttributes from "../__item_attributes/itemAttributes";
import ImageSliderItem from "../../../../reusable/images_slider_item/ImageSliderItem";
import { getItem } from "../../../../redux/item/itemShow";
import LimitText from "../../../../reusable/limit-text-length/limitText";
import "../ItemShow.css";
import { Link } from "react-router-dom";

const ItemShowReusable = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const { itemId, preview, nexStep } = props;
  useEffect(() => {
    const itemData = {
      id: itemId,
      store_id: "azerty",
    };
    dispatch(getItem(itemData));
  }, []);
  const item = useSelector((state) => state.getItemDetails);
  const [attributeImage, setAttributeImage] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [showInputNum, setShowInputNum] = useState(false);
  const [arraySelected, setArrayOfSelected] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const createCartItemResponse  = useSelector(state => state.createCartReducer);
  console.log('createCartItemResponse =>', createCartItemResponse)
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
    item_attributes,
  } = item;

  const showAttributeImage = (data) => {
    if (data.attribute.image_url) {
      setAttributeImage(data.attribute.image_url);
    }
  };

  const changeNumberOfItems = (e) => {
    const newNumber = e.target.value;
    if (newNumber >= 1) {
      setNumberOfItems(newNumber);
    }
  };

  const decreaseNumber = () => {
    if (numberOfItems > 1) {
      setNumberOfItems(numberOfItems - 1);
    }
  };

  const increaseNumber = () => {
    if (numberOfItems < quantity) {
      setNumberOfItems(numberOfItems + 1);
    }
  };

  const saveStoreLink = (link, id) => {
    localStorage.setItem(
      "storeLink",
      JSON.stringify({
        link: linkName(link),
        store_id: id,
      })
    );
    dispatch(
      setStoreLink({
        link: linkName(link),
        store_id: id,
      })
    );
  };

  const handleArrayOfSelected = (data) => {
    setArrayOfSelected(data)
  }

  const addToCart = () => {
     if(arraySelected.length === item_attributes.length){
      const data = {
        store_id: store_id,
        item_id: id,
        quantity: numberOfItems,
        price: price,
        user_id: userData.user.id,
      }
      dispatch(createNewCartItem(data));
      setErrorMessage(null);
     }else {
      setErrorMessage('Select attributes befor checkout!')
     }
  };

  return (
    <div className="item-show-container">
      <div className="item-show-wrapper">
        <div className="item-show-images-container">
          {items_images ? (
            <ImageSliderItem
              imagesArray={items_images}
              showAttributeImage={attributeImage}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="item-show-details">
          <Link
            className="item-store-link"
            to={`../store/${linkName(`${store_id}`)}`}
            onClick={() => saveStoreLink(`${store_id}`, store_id)}
          >
            In this Store
          </Link>
          <h4>{mainName}</h4>
          <div className="item-show-text-description">
            <LimitText limit={200} text={description} />
          </div>
          <div className="item-show-price-wrapp">
            <h5>USD {price}</h5>
          </div>
          <div className="item-show-details-container">
            <ItemAttributes
              data={item_attributes}
              showAttributeImage={showAttributeImage}
              handleArrayOfSelected={handleArrayOfSelected}
            />
          </div>
          <div className="item-show-quantity-wrapp">
            <p>Quantity:</p>
            <div className="item-show-details-attributes-wrapp">
              <button
                className={
                  numberOfItems === 1
                    ? "item-show-change-quantity-button inactive-button"
                    : "item-show-change-quantity-button"
                }
                onClick={() => decreaseNumber()}
              >
                -
              </button>
              <div
                onMouseOver={() => setShowInputNum(true)}
                onMouseLeave={() => setShowInputNum(false)}
                className="item-show-wrap-input-number-to-checkout"
              >
                {showInputNum ? (
                  <input
                    type="number"
                    className="item-show-input-number-to-checkout"
                    name="name"
                    value={numberOfItems}
                    onChange={(e) => changeNumberOfItems(e)}
                  />
                ) : (
                  <>{numberOfItems}</>
                )}
              </div>
              <button
                className={
                  numberOfItems >= quantity
                    ? "item-show-change-quantity-button inactive-button"
                    : "item-show-change-quantity-button"
                }
                onClick={() => increaseNumber()}
              >
                +
              </button>
            </div>
            <span className="item-quantity-available">
              {quantity} Pieces available
            </span>
          </div>
          <div className="add-to-cart-button-wrapp">
            <button
              className="add-to-cart-button"
              onClick={preview ? () => nexStep(true) : () => addToCart()}
            >
              {preview ? "Next >" : "Add To cart"}
            </button>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemShowReusable;
