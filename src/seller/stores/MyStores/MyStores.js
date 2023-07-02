import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsGraphUp } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { getStoresList } from '../../../redux/stores/getStoresReducer';
import LimitText from '../../../reusable/limit-text-length/limitText';
import locationIcon from '../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png';
import createNewIcon from '../../../images/icons/more-icon.png';
import ImageSilder from '../../../reusable/images_slider/ImageSilder';
import './MyStores.css';

const MyStores = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const storesList = useSelector((state) => state.getStoresReducer);

  useEffect(() => {
    dispatch(getStoresList(userData.user.id));
  }, []);

  return (
    <div className="my-stores-container flex flex-col">
      <h2>My Stores</h2>
      <Link to="../create-store" className="my-store-create-new flex">
        <img src={createNewIcon} alt="" className="icon" />
        <p>New store</p>
      </Link>

      {storesList.map((store) => {
        const {
          categories,
          country,
          description,
          images_url,
          id,
          location,
          name,
          token_id,
        } = store;

        return (
          <div className="my-store-wrapper" key={id}>
            <div className="my-store-picture-container">
              <Link
                to={`../store/${token_id}`}
              >
                <ImageSilder imagesArray={images_url} freeze />
              </Link>
            </div>
            <div className="my-store-details">
              <div className="flex flex-col">
                <Link
                  to={`../store/${token_id}`}
                >
                  <h3 className="my-store-name">{name}</h3>
                </Link>
                <div className="my-store-location flex flex-row">
                  <img src={locationIcon} alt="" className="icon" />
                  <p>
                    {location}
                    ,
                    {country ? country.name : null}
                  </p>
                </div>
                <Link to={`../store/${token_id}/analysis`} className="stores-list-ananlysis-link">
                  <span><BsGraphUp style={{ fontSize: '24px' }} /></span>
                  {' '}
                  Store analysis
                </Link>
                <LimitText text={description} limit={240} />
                {/* <p>{description}</p> */}
              </div>

              <div className="my-store-categories-wrapper">
                {categories.map((category) => (
                  <p key={category.name}>{category.name}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyStores;
