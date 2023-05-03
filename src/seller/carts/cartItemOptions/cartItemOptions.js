import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLoader} from 'react-icons/fi';
import {CiCircleRemove} from 'react-icons/ci';
import { getCartItems } from '../../../redux/cart/getCartsItemReducer';
import { deleteCartItem, deleteCartItemResponse } from '../../../redux/cart/createCartReducer';
import { deleteItemIdToCartList } from '../../../redux/cart/addedToCartIdList';
import './cartItemOptions.css';

const CartItemOptions = (props) => {
  const dispatch = useDispatch();
  const {
    item,
    hideOptions,
  } = props;
  const [loader, setLoader] = useState(false);
  
  const cartResponse  = useSelector(state => state.createCartReducer.message);
  const userData = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    if(cartResponse === 'Cart Item deleted successfully!'){
        dispatch(deleteItemIdToCartList(item.cart_item.id));
        dispatch(deleteCartItemResponse());
        dispatch(getCartItems(userData.user.id));
    }
  }, [cartResponse]);

  return (
    <div className='cart-item-options-container'>
        <button className='cart-item-options-button'>Buy Now</button>
        <button className='cart-item-options-button'>Order</button>
        <button
          onClick={() => {dispatch(deleteCartItem(item.id)); setLoader(true)}}
          className='cart-item-options-button cart-item-delete-button'>
            {loader ? <FiLoader className='button-loader'/>:'Remove'}
        </button>
        <div className='cart-item-options-cancel-wrapp'>
          <CiCircleRemove
            className='cart-item-options-cancel'
            onClick={hideOptions}
          />
        </div>
    </div>
  )
}

export default CartItemOptions