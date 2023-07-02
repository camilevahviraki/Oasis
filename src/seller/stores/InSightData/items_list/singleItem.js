import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import ImageSilder from '../../../../reusable/images_slider/ImageSilder';
import linkName from '../../../../reusable/remove-blanck-space/linkName';
import CartItemAttributes from '../../../carts/cartItem/cartItemAttributes';
import CalculatePrice from '../../../../reusable/calculatePrice/calculatePrice';
import { updateQuantity } from '../../../../redux/item/updatedItemQuantity';

const SingleItem = (props) => {
  const dispatch = useDispatch();
  const { itemData, checkProduct, setSelctedItem, selectedProducts, newSale, allowSelect } = props;
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
    token_id,
  } = itemData;

  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const handleUpdateQuantity = (sign) => {
    if(sign === '-' && updatedQuantity > 0){
      dispatch(updateQuantity({
        item_id: token_id, quantity: quantity - 1
      }))
      setUpdatedQuantity(updatedQuantity - 1);
    }else{
      dispatch(updateQuantity({
        item_id: token_id, quantity: quantity + 1
      }))
      setUpdatedQuantity(updatedQuantity + 1);
    }
  }

  return (
    <div className="order-item-wrapper" style={{ height: '90px' }}>
      <div
        className="order-item-image-wrapp"
      >
        <ImageSilder
          imagesArray={items_images}
        />
      </div>
      <div className="cart-item-description-wrapper">
        <div className="cart-item-description-name-details">
          <h5 className="cart-item-name">{main_name}</h5>

          <h5 className="cart-item-price">
            Price:
            {' '}
            <span>
              <CalculatePrice price={price} />
            </span>
          </h5>
          <CartItemAttributes itemAttributes={item_attributes} />
        </div>
        <div className="cart-item-buttons-wrapper">
          <div className="cart-item-quantity-wrapper">
            <p className="cart-item-quantity-available">
              Items available
            </p>
            <button
              className={
                updatedQuantity === 0
                  ? 'item-show-change-quantity-button inactive-button'
                  : 'item-show-change-quantity-button'
              }
              onClick={() => handleUpdateQuantity('-')}
            >
              -
            </button>
            <div className="item-show-wrap-input-number-to-checkout">
              <span>
                {updatedQuantity}
                {' '}
              </span>
              {' '}
            </div>
            <button 
            onClick={() => handleUpdateQuantity('+')}
            className='item-show-change-quantity-button'>
              +
            </button>
          </div>


          <Link
            to={`../item/${linkName(main_name)}/id/${token_id}`}
            className="cart-item-see-more-link"
          >
            {'> '}
            More details
          </Link>
        </div>
        {
          allowSelect || newSale ? (
            <div className='delete-checkbox-wrapp'>
              <label
                htmlFor={`check${id}`}
                className={selectedProducts.includes(id) ? 'delete-checkbox checked' : 'delete-checkbox'}
              >
                {selectedProducts.includes(id) ? <FaCheck /> : null}
              </label>
              <input type='checkbox' id={`check${id}`} className='checkBox'
                onChange={
                  !newSale ? (() => checkProduct(id)) : (() => setSelctedItem(item))}
              />
            </div>
          ) : (<></>)
        }
      </div>

    </div>
  )
}

export default SingleItem