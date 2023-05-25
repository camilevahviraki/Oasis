import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ItemShowReusable from './__item_reusable/ItemShowReusable';
import './ItemShow.css';

const ItemShow = () => {
  // const itemId = useSelector((state) => state.itemLinkReducer);
  const { id } = useParams();

  return <ItemShowReusable itemId={id} />;
};

export default ItemShow;
