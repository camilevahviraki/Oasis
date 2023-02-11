import React from 'react';
import { Link } from 'react-router-dom';
import ImageSilder from '../../../../reusable/images_slider/ImageSilder';
import locationIcon from "../../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png";
import './__my_store.css';

const MyStore = (props) => {

   const {
    categories,
    images_url,
    location,
    country,
    description,
    name,
    id,
    user_id
   } = props.storeData;

   const goToItemsList = (category) => {
     
   }
    
  return (
    <div className='my_store_container'>
  
      <div className='my_store_image_and_details'>
        <div className='my_store_image_wrap'>
          <ImageSilder imagesArray={images_url} freeze={false}/>
        </div>
        <div className='my_store_details_wrap'>
          <Link to={`../store/edit_name?store_id=${id}`}>
            <h3 className='my_store_categories_title_name'>{name}</h3>
          </Link>
          <div className='my_store_details_location'>
            <p className='my_store_details_location_icon'>Location<img src={locationIcon} alt="" className="icon" />: </p>
            <Link to={`../store/${id}/edit_location`}><p>{location}, {country}</p></Link>
          </div>
          <div className='my_store_details_description'>
             <p>
                {description}
             </p>
          </div>
        </div>
        <Link
          to={`../store/edit_name?store_id=${id}`}
          className="edit-link"
        >
          Edit
        </Link>
      </div>
           
       <div className='my_store_categories_wrapper'>
          <h3 className='my_store_categories_title'>Categories</h3>
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
            to={`../store/edit_categories?store_id=${id}`}
            className="edit-link"
          >
            Edit
        </Link>
       </div>

       <div className="my_store_categories_places_container">
        <h3 className='my_store_categories_title'>Others Locations</h3>
        <div className="my_store_categories_places row">
            <div>
                <img src={locationIcon} alt='' className="location-icon icon"/>
                Washington DC, USA
            </div>
            <div>
            <img src={locationIcon} alt='' className="location-icon icon"/>
                Casablanca, Morroco</div>
            <div>
            <img src={locationIcon} alt='' className="location-icon icon"/>
                Kinshasa, DRC</div>
            <div>
              <img src={locationIcon} alt='' className="location-icon icon"/>
                Bucharest, Romania </div>
        </div>

        <Link
          to={`../store/edit_places?store_id=${id}`}
          className="edit-link"
        >
          Edit
        </Link>

      </div>

    </div>
  )
}

export default MyStore;
