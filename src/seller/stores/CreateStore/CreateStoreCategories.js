import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStoreTypes,
  createStoreProgress,
} from '../../../redux/stores/createStoreReducer';
import { getCategories } from '../../../redux/stores_categories/stores_categories_reducer';
import Loader from '../../../reusable/loader/Loader';
import checkMark from '../../../images/icons/check-mark.png';
import removeMark from '../../../images/icons/remove-mark.png';

const CreateStoreCategories = (props) => {
  const [selected, setSelected] = useState([]);
  const [showLoader, setLoader] = useState(false);

  const storeData = useSelector((state) => state.createStoresReducer);
  const userData = useSelector((state) => state.authenticationReducer);
  const categories = useSelector((state) => state.storeCategoriesReducer);
  const { token } = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const addCategory = (category) => {
    if (selected.some((e) => e.name === category.name)) {
      const newSelected = selected.filter(
        (item) => item.name !== category.name,
      );
      setSelected(newSelected);
    } else {
      setSelected([...selected, category]);
    }
  };

  const SubmitCategories = () => {
    const formData = new FormData();
    categories.forEach((category) => {
      formData.append('categories[]', category);
    });

    dispatch(
      addStoreTypes(
        {
          categories: selected,
          step: 2,
          store_id: storeData.storeId.store_id,
          user_id: userData.user.id,
        },
        token,
      ),
    );

    setLoader(true);
  };

  if (props.progress === 2) {
    return (
      <div className="create-store-categories">
        {showLoader && props.progress === 2 ? <Loader /> : <></>}
        <div className="categories_list_container">
          <h2 className="categories_list_container_title">Select store categories</h2>
          <div className="categories_list_wrapper">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => {
                  addCategory(category);
                }}
                className="create-store-selected-type-wrap"
              >
                <h4>{category.name}</h4>
                {
                  selected.some((e) => e.name === category.name)
                    ? <img src={checkMark} alt="" className="icon absolut" /> : <></>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="categories_list_selected_container">
          <h2 className="categories_list_container_title">Selected categories</h2>
          <div className="categories_list_wrapper_selected">
            {selected.map((category, index) => (
              <div
                key={category.id}
                onClick={() => { addCategory(category); }}
              >
                <h4 className="create-store-selected-type">
                  {category.name}
                </h4>
              </div>
            ))}
          </div>
          <div className="create-store-categories-submit-container">
            <button type="button" onClick={SubmitCategories}>
              Next
              {'>'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default CreateStoreCategories;
