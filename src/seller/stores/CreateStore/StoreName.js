import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPicture } from "react-icons/ai";
import { addStoreNames } from "../../../redux/stores/createStoreReducer";
import { getCountries } from "../../../redux/countries/countriesReducer";
import storeSplahImage from "../../../images/store-image-holder.png";
import Loader from "../../../reusable/upload-progress/UploadProgress";
import FormR from "../../../reusable/form/FormR";
import "./css/CreateStoreNames.css";

const StoreName = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const { token } = userData;

  const [country, setCountry] = useState({ name: null });
  const [message, setMessage] = useState(null);
  const [showLoader, setLoader] = useState(false);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0]);
  const [gallery, setItemsGallery] = useState(null);
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const countriesList = useSelector((state) => state.countriesReducer);

  const submitStoreName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const city = e.target.city.value;

    if (name === "" || description === "" || city === "" || !country.name) {
      setMessage("Please! Complete all fields to go to the next step.");
      setInputErrorArr([1, 1, 1, 1]);
    } else {
      const storeNameData = {
        name,
        description,
        city,
        country: country.name,
        step: 1,
        user_id: userData.user.id,
        country_id: country.id,
        image: gallery,
      };

      dispatch(addStoreNames(storeNameData, token));
    }
  };

  const getSelectedCountry = (country) => {
    setCountry(country);
  };

  const formValues = [
    {
      type: "text",
      name: "name",
      placeholder: "name",
      classInput: "InputCreateStore",
      label: "Store Name",
    },
    {
      type: "select-country",
      placeholder: "input country",
      classInput: "InputCreateStore",
      data: countriesList,
      label: "Country",
    },
    {
      type: "text",
      name: "city",
      placeholder: "city",
      classInput: "InputCreateStore",
      label: "City",
    },
    {
      type: "textarea",
      name: "description",
      placeholder: "description",
      classInput: "TextAreaCreateStore",
      label: "Store Description",
    },
  ];

  const classForm = "form-create-store-names";

  if (props.progress === 1) {
    return (
      <div className="create-store-names">
        {showLoader && props.progress === 1 ? <Loader /> : <></>}
        <div className="create-store-main-image-preview-container">
          <div className="create-store-image-preview-wrapp">
            <img
              src={gallery ? URL.createObjectURL(gallery) : storeSplahImage}
              alt=""
              className="create-store-image-preview"
            />
          </div>
          <label
            htmlFor="store-image"
            className="create-store-label-input-file"
          >
            <AiFillPicture />
            <input
              id="store-image"
              type="file"
              accept="image/*,video/*"
              className="create-item-input-file"
              onChange={(e) => {
                setItemsGallery(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <FormR
          classForm={classForm}
          inputsArray={formValues}
          submitFunction={submitStoreName}
          submitButton="Next"
          submitClass="create-store-submit"
          getSelectedCountry={getSelectedCountry}
          errorMessage={message}
          inputErrorArr={inputErrorArr}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default StoreName;
