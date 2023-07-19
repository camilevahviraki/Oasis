import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ImageSilder from '../../../../reusable/images_slider/ImageSilder';
import { setStoreFieldToUpdate } from '../../../../redux/stores/updateStoreReducer';
import locationIcon from '../../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png';
import inputFileIcon from '../../../../images/input-file.png';
import splashImage from '../../../../images/store-image-holder.png';
import './__my_store.css';

const MyStore = (props) => {
  const dispatch = useDispatch();
  const { token_id } = useParams();
  const {
    categories,
    images_url,
    location,
    country,
    description,
    name,
    id,
    user_id,
    main_image_url,
    coordinate,
  } = props.storeData;

  const goToItemsList = (category) => {

  };

  const goToUpdateFieldPage = (field, value) => {
    dispatch(setStoreFieldToUpdate(field, value));
  };

  return (
    <div className="my_store_container">

      <div className="my_store_image_and_details">
        <div className="my_store_image_wrap">
          <ImageSilder imagesArray={images_url} freeze={false} />
          <Link
            to={`../store/${token_id}/update?field=images_url`}
            onClick={() => goToUpdateFieldPage('Pictures', images_url)}
            className="my_store_image_wrap_edit-link"
          >
            <div className="my_store_image_wrap_edit">
              <img src={inputFileIcon} alt="" className="input-file-icon" />
            </div>
          </Link>
          <div className="store-edit-image-profile-wrapp">
            <Link
              to={`../store/${token_id}/update?field=main_image_profile`}
              onClick={() => goToUpdateFieldPage('main_image', main_image_url)}
            >
              <img src={main_image_url || splashImage} alt="" />
            </Link>
          </div>
        </div>
        <div className="my_store_details_wrap">
          <Link
            to={`../store/${token_id}/update?field=name`}
            onClick={() => goToUpdateFieldPage('name', name)}
          >
            <h3 className="my_store_categories_title_name">{name}</h3>
          </Link>
          <div className="my_store_details_location">
            <p className="my_store_details_location_icon">
              Location
              <img src={locationIcon} alt="" className="icon" />
              :
              {' '}
            </p>
            <Link
              to={`../store/${token_id}/update?field=location`}
              onClick={() => goToUpdateFieldPage('location', location)}
            >
              <p>
                {location}
                ,
                {country ? country.name : null}
              </p>
            </Link>
          </div>
          <div className="my_store_details_description">
            <p>
              {description}
            </p>
          </div>
        </div>
        <Link
          to={`../store/${token_id}/update?field=description`}
          onClick={() => goToUpdateFieldPage('description', description)}
          className="edit-link"
        >
          Edit
        </Link>
      </div>
      <div className="my_store_categories_wrapper">
        <h3 className="my_store_categories_title">Categories</h3>
        <div className="my_store_categories">
          <Link
            to={`../my-stores/${token_id}/items?type=all&store_d=${id}`}
            onClick={() => goToItemsList('all')}
          >
            <p>All Items</p>
          </Link>
          {categories ? categories.map((category) => (
            <Link
              to={`../my-stores/${token_id}/items?type=${category.name}&store_d=${id}`}
              onClick={() => goToItemsList(category.name)}
              key={category.name}
            >
              <p>{category.name}</p>
            </Link>
          )) : <></>}
        </div>
        <Link
          to={`../store/${token_id}/update?field=categories`}
          onClick={() => goToUpdateFieldPage('categories', categories)}
          className="edit-link"
        >
          Edit
        </Link>
      </div>

      <div className="my_store_categories_places_container">
        <h3 className="my_store_categories_title">Others Locations</h3>
        <div className="my_store_categories_places row">
          <div>
            <img src={locationIcon} alt="" className="location-icon icon" />
            Washington DC, USA
          </div>
          <div>
            <img src={locationIcon} alt="" className="location-icon icon" />
            Casablanca, Morroco
          </div>
          <div>
            <img src={locationIcon} alt="" className="location-icon icon" />
            Kinshasa, DRC
          </div>
          <div>
            <img src={locationIcon} alt="" className="location-icon icon" />
            Bucharest, Romania
            {' '}
          </div>
        </div>

        <Link
          to={`../store/${token_id}/update?field=others_locations`}
          onClick={() => goToUpdateFieldPage('others_location', 'Casablanca sample')}
          className="edit-link"
        >
          Edit
        </Link>

      </div>

    </div>
  );
};

export default MyStore;
