import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import MyItem from './item/MyItem';
import { getItems } from '../../../redux/item/getItem';
import createNewIcon from "../../../images/icons/more-icon.png";
import './StoreItem.css';

const StoreItems = (props) => {

  const dispatch = useDispatch();

  const queryParameters = new URLSearchParams(window.location.search)
  const category = queryParameters.get("type");
  const store_id = queryParameters.get("store_d");

  const storeLink = useSelector((state) => state.storeLinkReducer);
  const itemsList = useSelector((state) => state.getItemsList);

  useEffect(() => {
    dispatch(getItems({category, store_id}));
  }, []);

  console.log('items =>', itemsList);

  return (
    <div className='store-items-container'>
      <h2>{category}</h2>
      <div className='store-items-link-new-wrapper'>
        {
          storeLink?(
            <Link
              to={`../my-stores/${storeLink.link.link}/item/new?type=${category}`}
              className="my-store-create-new flex"
            >
          <img src={createNewIcon} alt="" className="icon" />
          <p>New Item</p>
        </Link>
          ):
          (<></>)
        }
      </div>
      <div className='store-items-list-wrap'>
        {
          itemsList.map((item) => (
            <MyItem itemData={item}/>
          ))
        }
      </div>

    </div>
  )
}

export default StoreItems