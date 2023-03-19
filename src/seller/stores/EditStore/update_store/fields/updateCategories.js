import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../reusable/loader/Loader';
import { getCategories } from '../../../../../redux/stores_categories/stores_categories_reducer';
import { deleteStoreCategory, addNewStoreCategory, resetStoreFieldToUpdate } from '../../../../../redux/stores/updateStoreReducer';
import { getCategoriesForAStore } from '../../../../../redux/stores/getStoreCategories';
import FormR from '../../../../../reusable/form/FormR';
import Countries from '../../../../../components/countries/countries';
import PopUpAlert from '../../../../../reusable/pop-up-alert/PopUpAlert';
import checkMark from '../../../../../images/icons/check-mark.png';
import removeMark from '../../../../../images/icons/remove-mark.png';
import './css/updateCategories.css';

const UpdateCategories = (props) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.getStoreShowReducer);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCategoriesForAStore(storeData.id));
  }, []);

  const updateData = useSelector((state) => state.updateStoreReducer);
  const storeCategories = useSelector((state) => state.getStoreCategories);
  const categories = useSelector((state) => state.storeCategoriesReducer);
  const [showLoader, setLoader] = useState(false);
  const [showAlert, setShowAlert] = useState({ state: false, id: null });
  const [allertMessage, setAllertMessage] = useState(null);
  const [categoryToAdd, setCategorToAdd] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addCategory = (e) => {
    e.preventDefault();
    const checkExisting = storeCategories.some((e) => e.name === categoryToAdd.name);
    if (categoryToAdd && !checkExisting) {
      dispatch(addNewStoreCategory(categoryToAdd, storeData.id));
      dispatch(getCategoriesForAStore(storeData.id));
      setCategorToAdd(false);
    } else if (categoryToAdd && checkExisting) {
      setErrorMessage('Please this category allready exist');
    } else {
      setErrorMessage('Please fill up the field before submiting');
    }
  };

  const removeCategory = (id) => {
    dispatch(deleteStoreCategory(id));
  };

  const showPopUpAlert = (state, category) => {
    console.log(showAlert);
    if (state) {
      setShowAlert({ id: category.id, state });
      setAllertMessage(`
      This action is irreversible, All the Items in ${category.name} category will be loss.
      Please transfer them in another category instaed before making this action.
      Delete now?
      `);
    } else {
      setShowAlert({ id: null, state });
    }
  };

  if (showAlert.state && updateData.response && updateData.response.message === 'Deleted successfully') {
    dispatch(getCategoriesForAStore(storeData.id));
    dispatch(resetStoreFieldToUpdate());
    showPopUpAlert(false);
  } else if (updateData.response && updateData.response.message === 'Added successfully') {
    dispatch(getCategoriesForAStore(storeData.id));
    setErrorMessage('Added successfully');
    dispatch(resetStoreFieldToUpdate());
  }

  const formValues = [
    {
      type: 'select-country',
      placeholder: 'input a store type',
      classInput: 'InputCreateStore',
      data: categories,
      label: 'Store Types',
    }];

  return (
    <div className="w-full flex align-center update-store-categories-container">
      <div className="update-store-categories-container-child">
        <div className="update-store-categories-wrapper">
          <FormR
            classForm="qwerty"
            inputsArray={formValues}
            submitFunction={addCategory}
            submitButton="Add"
            submitClass="update-store-categories-button"
            getSelectedCountry={(category) => setCategorToAdd(category)}
            errorMessage={errorMessage}
          />
        </div>
        <div className="update-store-categories-wrapper">
          Selected
          {storeCategories.map((category, index) => (
            <div key={category.id} className="create-store-selected-type-wrap">
              <h4>{category.name}</h4>
              <img
                src={removeMark}
                alt=""
                className="icon absolut"
                onClick={() => showPopUpAlert(true, category)}
              />
              {showAlert.state === true && category.id == showAlert.id ? (
                <PopUpAlert
                  message={allertMessage}
                  cancelFunc={showPopUpAlert}
                  approveFunc={removeCategory}
                  approveButton="Confirm"
                  data={category}
                />
              ) : (
                <></>
              )}
            </div>
          ))}
          <p>{updateData.response ? updateData.response.message : null}</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategories;
