import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemLink } from '../../../redux/itemLink/itemLinkreducer';
import linkName from '../../../reusable/remove-blanck-space/linkName';
import LimitText from '../../../reusable/limit-text-length/limitText';
import ImageSilder from '../../../reusable/images_slider/ImageSilder';
import './ItemIndex.css';

const ItemsList = (props) => {
  const dispatch = useDispatch();
  const { itemsData, storeData, rows } = props;

  const setStoreItemLink = (itemName, id) => {
    let itemLink = null;
    if (storeData) {
      itemLink = `store/${linkName(storeData.name)}/item/${linkName(itemName)}`;
    } else {
      itemLink = `item/${linkName(itemName)}`;
    }

    dispatch(setItemLink(itemLink, id));
  };

  return (
    <div className="store-items-list">
      {itemsData.map((item) => {
        const {
          items_images, mainName, names, price, store_id, description, id,
        } = item;
        console.log(item);
        return (
          <Link
            to={
              storeData
                ? `../store/${linkName(storeData.name)}/item/${linkName(
                  item.mainName,
                )}`
                : `../item/${linkName(item.mainName)}`
            }
            onClick={() => setStoreItemLink(item.mainName, id)}
          >
            <div className="store-item-wrapp">
              <div className="store-item-image-wrapp">
                <ImageSilder imagesArray={items_images} freeze />
              </div>
              <div className="store-item-description">
                <p className="store-item-price">
                  $
                  {price}
                </p>
                <div className='store-item-text'>
                <LimitText text={`${mainName.toUpperCase()}${' '}${description}`} limit={30} className="store-item-description-text" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ItemsList;
