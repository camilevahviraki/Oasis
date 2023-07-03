import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCreateStoreData } from '../../../../../redux/item/createItem';
import ItemShowReusable from '../../../showItem/__item_reusable/ItemShowReusable';

const Preview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createItemData = useSelector((state) => state.createItemReducer);
  const storeLink = useSelector((state) => state.storeLinkReducer);
  const {
    item,
  } = createItemData;

  const { token_id } = useParams();

  const nexStep = (state) => {
    if (state) {
      navigate(`../store/${token_id}`);
      dispatch(resetCreateStoreData());
    }
  };

  return (
    <>
      <ItemShowReusable itemId={item.item_id} preview nexStep={nexStep} />
    </>
  );
};

export default Preview;
