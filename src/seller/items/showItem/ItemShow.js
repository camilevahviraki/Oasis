import React from 'react';
import { useSelector } from 'react-redux';
import ItemShowReusable from './__item_reusable/ItemShowReusable';
import './ItemShow.css';

const ItemShow = () => {
  const itemId = useSelector((state) => state.itemLinkReducer);

  return (<ItemShowReusable itemId={itemId.itemId}/>);
};

export default ItemShow;
