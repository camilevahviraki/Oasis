import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { updateCartItemQuantity } from "../../../redux/cart/createCartReducer";
import { updateCartItemQuantityDisplay } from "../../../redux/cart/getCartsItemReducer";
import { setItemLink } from "../../../redux/itemLink/itemLinkreducer";
import linkName from "../../../reusable/remove-blanck-space/linkName";
import ImageSilder from "../../../reusable/images_slider/ImageSilder";
import CartItemAttributes from "./cartItemAttributes";
import CartItemOptions from "../cartItemOptions/cartItemOptions";
import CalculatePrice from "../../../reusable/calculatePrice/calculatePrice";
import "./cartItem.css";

const CartItem = (props) => {
  const userData = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();
  const { cartItem, showOptions, handleShowOptions } = props;
  const [mouseOverImage, setMouseOverImage] = useState(null);
  const [numberOfItems, setNumberOfItems] = useState(cartItem.quantity);

  const decreaseNumber = () => {
    if (numberOfItems > 1) {
      setNumberOfItems(numberOfItems - 1);
    }
  };

  const increaseNumber = () => {
    if (numberOfItems < cartItem.cart_item.quantity) {
      setNumberOfItems(numberOfItems + 1);
    }
  };

  useEffect(() => {
    dispatch(
      updateCartItemQuantity({
        quantity: numberOfItems,
        cart_item_id: cartItem.id,
      })
    );
    dispatch(
      updateCartItemQuantityDisplay({
        quantity: numberOfItems,
        cart_item_id: cartItem.id,
      })
    )
  }, [numberOfItems]);

  const setStoreItemLink = (itemName, id) => {
    const itemLink = `item/${linkName(itemName)}`;
    dispatch(setItemLink(itemLink, id));
  };

  return (
    <div className="cart-item-wrapper">
      <div
        className="cart-item-image-wrapp"
        onMouseOver={() => setMouseOverImage(cartItem.id)}
        onMouseOut={() => setMouseOverImage(null)}
      >
        <ImageSilder
          imagesArray={cartItem.cart_item.items_images}
          freeze={mouseOverImage !== cartItem.id}
        />
      </div>
      <div className="cart-item-description-wrapper">
        <div className="cart-item-description-name-details">
          <h5 className="cart-item-name">{cartItem.cart_item.main_name}</h5>

          <h5 className="cart-item-price">
            Price:{" "}
            <span>
              <CalculatePrice price={cartItem.cart_item.price} />
            </span>
          </h5>
          <CartItemAttributes itemAttributes={cartItem.item_attributes} />
        </div>
        <div className="cart-item-buttons-wrapper">
          <Link
            to={`../item/${linkName(cartItem.cart_item.main_name)}`}
            className="cart-item-see-more-link"
            onClick={() =>
              setStoreItemLink(
                cartItem.cart_item.main_name,
                cartItem.cart_item.id
              )
            }
          >
            {"> "}More details
          </Link>

          <h5 className="cart-item-price">
            <div className="cart-item-unit-price">
              Total price :{" "}
              <span>
                <CalculatePrice
                  price={cartItem.cart_item.price * numberOfItems}
                />
              </span>
            </div>
          </h5>
          <div className="cart-item-quantity-wrapper">
            <span className="cart-item-qunatity-title">Quantity: </span>
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
            <div className="item-show-wrap-input-number-to-checkout">
              <>{numberOfItems}</>
            </div>
            <button
              className={
                numberOfItems >= cartItem.cart_item.quantity
                  ? "item-show-change-quantity-button inactive-button"
                  : "item-show-change-quantity-button"
              }
              onClick={() => increaseNumber()}
            >
              +
            </button>
          </div>
          <p className="cart-item-quantity-available">
            <span>{cartItem.cart_item.quantity} </span> Items available
          </p>
        </div>
      </div>
      <div className="cart-items-options-button-wrapper">
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
      )}
    </div>
  );
};

export default CartItem;
