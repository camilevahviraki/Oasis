import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { setStoreLink } from '../../../../redux/storeLink/storeLinkReducer';
import { getCartItems } from '../../../../redux/cart/getCartsItemReducer';
import {
  createNewCartItem,
  deleteCartItemResponse,
} from '../../../../redux/cart/createCartReducer';
import linkName from '../../../../reusable/remove-blanck-space/linkName';
import ItemAttributes from '../__item_attributes/itemAttributes';
import ImageSliderItem from '../../../../reusable/images_slider_item/ImageSliderItem';
import { getItem } from '../../../../redux/item/itemShow';
import LimitText from '../../../../reusable/limit-text-length/limitText';
import CalculatePrice from '../../../../reusable/calculatePrice/calculatePrice';
import '../ItemShow.css';

const ItemShowReusable = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const { itemId, preview, nexStep } = props;
  useEffect(() => {
    const itemData = {
      id: itemId,
      store_id: 'azerty',
    };
    dispatch(getItem(itemData));
  }, []);
  const item = useSelector((state) => state.getItemDetails);
  const [attributeImage, setAttributeImage] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [showInputNum, setShowInputNum] = useState(false);
  const [arraySelected, setArrayOfSelected] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const createCartItemResponse = useSelector(
    (state) => state.createCartReducer.message,
  );
  const selectedCurrency = useSelector((state) => state.selectedCurrency);

  const {
    created_at,
    currency,
    id,
    item_categories,
    items_images,
    main_name,
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
      'storeLink',
      JSON.stringify({
        link: linkName(link),
        store_id: id,
      }),
    );
    dispatch(
      setStoreLink({
        link: linkName(link),
        store_id: id,
      }),
    );
  };

  const handleArrayOfSelected = (data) => {
    setArrayOfSelected(data);
  };

  const assignAttributeId = (title) => {
    const itemAttribute = arraySelected.filter(
      (elmnt) => elmnt.title === title,
    );
    if (itemAttribute.length > 0) {
      return itemAttribute[0].attribute.id;
    }
    return null;
  };

  const addToCart = () => {
    if (quantity <= 0) {
      setErrorMessage('This product is currently out of stock!');
    } else if (arraySelected.length === item_attributes.length) {
      const data = {
        store_id,
        item_id: id,
        quantity: numberOfItems,
        price,
        user_id: userData.user.id,
        item_capacity: assignAttributeId('Capacity'),
        item_color: assignAttributeId('Color'),
        item_material: assignAttributeId('Material'),
        item_size: assignAttributeId('Size'),
      };
      dispatch(createNewCartItem(data));
      setErrorMessage(null);
      setButtonLoader(true);
    } else {
      setErrorMessage('Select attributes befor checkout!');
    }
  };

  useEffect(() => {
    if (createCartItemResponse === 'Item saved in cart successfully!') {
      dispatch(deleteCartItemResponse());
      dispatch(getCartItems(userData.user.id));
      setButtonLoader(false);
      setErrorMessage('Saved successfully!');
    }
  }, [createCartItemResponse]);

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
            to={`../store/${store_id}`}
          >
            In this Store
          </Link>
          <h4>{main_name}</h4>
          <div className="item-show-text-description">
            <LimitText limit={200} text={description} more />
          </div>
          <div className="item-show-price-wrapp">
            <h5>
              <CalculatePrice price={price} />
            </h5>
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
                    ? 'item-show-change-quantity-button inactive-button'
                    : 'item-show-change-quantity-button'
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
                    ? 'item-show-change-quantity-button inactive-button'
                    : 'item-show-change-quantity-button'
                }
                onClick={() => increaseNumber()}
              >
                +
              </button>
            </div>
            <span className="item-quantity-available">
              {quantity}
              {' '}
              Pieces available
            </span>
          </div>
          <div className="add-to-cart-button-wrapp">
            <button
              className="add-to-cart-button"
              onClick={preview ? () => nexStep(true) : () => addToCart()}
              disabled={buttonLoader}
            >
              {buttonLoader ? (
                <FiLoader className="button-loader white-loader" />
              ) : (
                <>{preview ? 'Next >' : 'Add To cart'}</>
              )}
            </button>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemShowReusable;
