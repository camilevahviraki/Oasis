import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import {
  createNewCartItem,
  deleteCartItemResponse,
} from "../../../redux/cart/createCartReducer";
import { addNewItemIdToCartList } from "../../../redux/cart/addedToCartIdList";
import { getCartItems } from "../../../redux/cart/getCartsItemReducer";
import { setItemLink } from "../../../redux/itemLink/itemLinkreducer";
import linkName from "../../../reusable/remove-blanck-space/linkName";
import LimitText from "../../../reusable/limit-text-length/limitText";
import ImageSilder from "../../../reusable/images_slider/ImageSilder";
import CalculatePrice from "../../../reusable/calculatePrice/calculatePrice";
import "./ItemIndex.css";

const ItemsList = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const { itemsData, storeData, rows } = props;
  const [clickedCart, setCickedCart] = useState([]);
  const [showCartIcon, setCartIcon] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const createCartItemResponse = useSelector(
    (state) => state.createCartReducer.message
  );

  const addedToCartIdList = useSelector(
    (state) => state.addedToCartIdList.data
  );

  const setStoreItemLink = (itemName, id) => {
    let itemLink = null;
    if (storeData) {
      itemLink = `store/${linkName(storeData.name)}/item/${linkName(itemName)}`;
    } else {
      itemLink = `item/${linkName(itemName)}`;
    }
    dispatch(setItemLink(itemLink, id));
  };

  const addToCart = (item) => {
    const data = {
      store_id: item.store_id,
      item_id: item.id,
      quantity: 1,
      price: item.price,
      user_id: userData.user.id,
      item_capacity: null,
      item_color: null,
      item_material: null,
      item_size: null,
    };
    dispatch(createNewCartItem(data));
    setButtonLoader(item.id);
    dispatch(addNewItemIdToCartList(item.id));
  };

  useEffect(() => {
    if (createCartItemResponse === "Item saved in cart successfully!") {
      setAddedToCart(buttonLoader);
      dispatch(deleteCartItemResponse());
      dispatch(getCartItems(userData.user.id));
      setButtonLoader(null);
    }
  }, [createCartItemResponse]);

  return (
    <div className="store-items-list">
      {itemsData.map((item) => {
        const {
          items_images,
          main_name,
          names,
          price,
          store_id,
          description,
          quantity,
          id,
        } = item;
        return (
          <div
            onMouseOver={() => setCartIcon(id)}
            onMouseOut={() => setCartIcon(null)}
          >
            <div className="store-item-wrapp">
              <div className="store-item-image-wrapp">
                <Link
                  to={
                    storeData
                      ? `../store/${linkName(storeData.name)}/item/${linkName(
                          item.main_name
                        )}`
                      : `../item/${linkName(item.main_name)}`
                  }
                  onClick={() => setStoreItemLink(item.main_name, id)}
                >
                  <ImageSilder imagesArray={items_images} freeze />
                </Link>
              </div>
              <div className="store-item-description">
                <p className="store-item-price"><CalculatePrice price={price}/></p>
                <div className="store-item-text">
                  <LimitText
                    text={`${main_name.toUpperCase()}${" "}${description}`}
                    limit={30}
                    className="store-item-description-text"
                  />
                </div>
              </div>
              {(showCartIcon === id && quantity > 0) ||
              addedToCartIdList.includes(id) ? (
                <div
                  className="item-cart-button-wrapp"
                  onClick={() => addToCart(item)}
                >
                  {buttonLoader === id ? (
                    <FiLoader className="button-loader white-loader" />
                  ) : (
                    <>
                      {addedToCart === id || addedToCartIdList.includes(id) ? (
                        <BsCartCheck color={"green"} />
                      ) : (
                        <BsCartPlus />
                      )}
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemsList;
