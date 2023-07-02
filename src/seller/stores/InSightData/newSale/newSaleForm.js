import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import FormR from '../../../../reusable/form/FormR';
import { useNavigate, useParams } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import ImageSilder from '../../../../reusable/images_slider/ImageSilder';
import CalculatePrice from '../../../../reusable/calculatePrice/calculatePrice';
import LimitText from '../../../../reusable/limit-text-length/limitText';
import ItemAttributes from '../../../items/showItem/__item_attributes/itemAttributes';
import { createNewStoreSale, deleteStoreSaleResponse } from '../../../../redux/store_sales/createStoreSales';

const NewSaleForm = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { item, redirectPage } = props;
  const [attributes, setAttributes] = useState([]);
  const [attributeImage, setAttributeImage] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [showInputNum, setShowInputNum] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const createStoreSaleResponse = useSelector(
    (state) => state.createStoreSaleReducer.message,
  );

  const {
    description, item_attributes,
    items_images, main_name,
    price, quantity, store_id,
  } = item;

  const handleArrayOfSelected = (attributes) => {
    console.log(attributes);
    setAttributes(attributes);
  }

  const showAttributeImage = (image) => {
    console.log(image);
  }

  const decreaseNumber = () => {
    if (numberOfItems > 1) {
      setNumberOfItems(numberOfItems - 1);
    }
  };

  const increaseNumber = () => {
    if (numberOfItems < quantity) {
      setNumberOfItems(parseInt(numberOfItems, 10) + 1);
    }
  };

  const changeNumberOfItems = (e) => {
    const newNumber = e.target.value;
    if (newNumber >= 1) {
      setNumberOfItems(newNumber);
    }
  }

  const addStoreSale = () => {
    const data = {
      item_id: item.id,
      store_id: store_id,
      item_capacity: null,
      item_color: null,
      item_material: null,
      item_size: null,
      unit_price: price,
      price_paid: parseInt(price, 10) * numberOfItems,
      quantity: numberOfItems,
    };

    if(item_attributes.length === attributes.length){
      dispatch(createNewStoreSale(data));
      setButtonLoader(true);
    }

  }
  const pageLink = `../store/${params.token_id}/analysis?page=`;

  useEffect(() => {
    if (createStoreSaleResponse === 'Store Sale saved in StoreSale successfully!') {
      dispatch(deleteStoreSaleResponse());
      setButtonLoader(false);
      setErrorMessage('Saved successfully!');
      navigate(`${pageLink}sales`);
      redirectPage();
    }
  }, [createStoreSaleResponse]);

  return (
    <div className='new-sale-form-container'>
      <div className='new-sale-form-item-container'>
        <div className='new-sale-form-image-slider-wrapp'>
          <ImageSilder imagesArray={items_images} freeze />
        </div>
        <div className='new-sale-form-item-description'>
          <h3>{'> '}{main_name}</h3>
          <h4><CalculatePrice price={price} /></h4>
          <p><LimitText text={description} limit={200} /></p>
          <ItemAttributes
            data={item_attributes}
            showAttributeImage={showAttributeImage}
            handleArrayOfSelected={handleArrayOfSelected}
            displayGrid
          />
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
        </div>
      </div>
      <div className="add-to-cart-button-wrapp">
            <button
              className="add-to-cart-button"
              onClick={ () => addStoreSale()}
              disabled={buttonLoader}
            >
              {buttonLoader ? (
                <FiLoader className="button-loader white-loader" />
              ) : (
                <>{'Confirm sale'}</>
              )}
            </button>
            <p>{errorMessage}</p>
          </div>
    </div>
  )
}

export default NewSaleForm;