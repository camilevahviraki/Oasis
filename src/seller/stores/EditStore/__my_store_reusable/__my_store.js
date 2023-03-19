import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ImageSilder from '../../../../reusable/images_slider/ImageSilder';
import linkName from '../../../../reusable/remove-blanck-space/linkName';
import { setStoreFieldToUpdate } from '../../../../redux/stores/updateStoreReducer';
import locationIcon from '../../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png';
import inputFileIcon from '../../../../images/input-file.png';
import './__my_store.css';

const MyStore = (props) => {
  const dispatch = useDispatch();

  const {
    categories,
    images_url,
    location,
    country,
    description,
    name,
    id,
    user_id,
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
            to={`../store/${linkName(name)}/update?field=images_url`}
            onClick={() => goToUpdateFieldPage('Pictures', images_url)}
            className="my_store_image_wrap_edit-link"
          >
            <div className="my_store_image_wrap_edit">
              <img src={inputFileIcon} alt="" className="input-file-icon" />
            </div>
          </Link>
        </div>
        <div className="my_store_details_wrap">
          <Link
            to={`../store/${linkName(name)}/update?field=name`}
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
              to={`../store/${linkName(name)}/update?field=location`}
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
          to={`../store/${linkName(name)}/update?field=description`}
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
            to={`../my-stores/${name}/items?type=all&store_d=${id}`}
            onClick={() => goToItemsList('all')}
          >
            <p>All Items</p>
          </Link>
          {categories.map((category) => (
            <Link
              to={`../my-stores/${name}/items?type=${category.name}&store_d=${id}`}
              onClick={() => goToItemsList(category.name)}
            >
              <p>{category.name}</p>
            </Link>
          ))}
        </div>
        <Link
          to={`../store/${linkName(name)}/update?field=categories`}
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
          to={`../store/${linkName(name)}/update?field=others_locations`}
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
