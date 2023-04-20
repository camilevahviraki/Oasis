import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { resetCreateStoreData } from '../../../../../redux/item/createItem';
import ItemShowReusable from '../../../showItem/__item_reusable/ItemShowReusable';

const Preview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createItemData = useSelector((state) => state.createItemReducer);
  const storeLink = useSelector((state) => state.storeLinkReducer);
  const {
    item
  } = createItemData;

  const nexStep = (state) => {
    if(state){
      navigate(`../store/${storeLink.link.link}`);
      dispatch(resetCreateStoreData());
    }
  }
  return (
    <> 
      <ItemShowReusable itemId={item.item_id} preview={true} nexStep={nexStep}/>  
    </>
  )
}

export default Preview