import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { updateCartItemQuantity } from '../../../redux/cart/createCartReducer';
import { updateCartItemQuantityDisplay } from '../../../redux/cart/getCartsItemReducer';
import { setItemLink } from '../../../redux/itemLink/itemLinkreducer';
import linkName from '../../../reusable/remove-blanck-space/linkName';
import ImageSilder from '../../../reusable/images_slider/ImageSilder';
import CartItemAttributes from '../../carts/cartItem/cartItemAttributes';
import CalculatePrice from '../../../reusable/calculatePrice/calculatePrice';
import './OrderItem.css';

const OrderItem = (props) => {
  const dispatch = useDispatch();

  const {
    attributes_item, exchange, item, store_id,
  } = props.data;
  const {
    description, items_images, main_name, price, quantity, token_id,
  } = item;

  return (
    <div className="order-item-wrapper">
      <div
        className="order-item-image-wrapp"
      >
        <ImageSilder
          imagesArray={items_images}
          freeze
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
          <CartItemAttributes itemAttributes={attributes_item} />
        </div>
        <div className="cart-item-buttons-wrapper">
          <h5 className="cart-item-price">
            <div className="cart-item-unit-price">
              Total price :
              {' '}
              <span>
                <CalculatePrice
                  price={price * exchange}
                />
              </span>
            </div>
          </h5>
          <div className="cart-item-quantity-wrapper">
            <span className="cart-item-qunatity-title">Quantity: </span>
            <button
              className={
              exchange === 1
                ? 'item-show-change-quantity-button inactive-button'
                : 'item-show-change-quantity-button'
            }
            >
              -
            </button>
            <div className="item-show-wrap-input-number-to-checkout">
              <>{exchange}</>
            </div>
            <button
              className={
              exchange >= quantity
                ? 'item-show-change-quantity-button inactive-button'
                : 'item-show-change-quantity-button'
            }
            >
              +
            </button>
          </div>
          <p className="cart-item-quantity-available">
            <span>
              {quantity}
              {' '}
            </span>
            {' '}
            Items available
          </p>

          <Link
            to={`../item/${linkName(main_name)}/id/${token_id}`}
            className="cart-item-see-more-link"
          >
            {'> '}
            More details
          </Link>
        </div>
      </div>
      {/* <div className="cart-items-options-button-wrapper">
      <BsThreeDotsVertical
        className="cart-item-show-options"
        onClick={() => {
          if (showOptions) {
            handleShowOptions(null);
          } else {
            handleShowOptions(cartItem);
          }
        }}
      />
    </div>
    {showOptions ? (
      <CartItemOptions
        item={cartItem}
        hideOptions={() => handleShowOptions(null)}
      />
    ) : (
      <></>
    )} */}
    </div>
  );
};

export default OrderItem;
