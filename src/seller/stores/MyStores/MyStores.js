import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStoresList } from '../../../redux/stores/getStoresReducer';
import { setStoreLink } from '../../../redux/storeLink/storeLinkReducer';
import linkName from '../../../reusable/remove-blanck-space/linkName';
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

  const saveStoreLink = (link, id) => {
    localStorage.setItem('storeLink',
      JSON.stringify({
        link: linkName(link),
        store_id: id,
      }));
    dispatch(setStoreLink({
      link: linkName(link),
      store_id: id,
    }));
  };

  return (
    <div className="my-stores-container flex flex-col">
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
        } = store;

        return (
          <div className="my-store-wrapper">
            <div className="my-store-picture-container">
              <Link
                to={`../store/${linkName(name)}`}
                onClick={() => saveStoreLink(name, id)}
              >
                <ImageSilder imagesArray={images_url} freeze />
              </Link>
            </div>
            <div className="my-store-details">
              <div className="flex flex-col">
                <Link
                  to={`../store/${linkName(name)}`}
                  onClick={() => saveStoreLink(name, id)}
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
                <p>{description}</p>
              </div>

              <div className="my-store-categories-wrapper">
                {categories.map((category) => (
                  <p>{category.name}</p>
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
