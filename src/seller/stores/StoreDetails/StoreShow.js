import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStoresShow } from "../../../redux/stores/getStoreShowReducer";
import MyStore from "./__my_store_reusable/__my_store";
import CheckValidImage from "../../../reusable/check-image/checkValidImage";
import vectorShop from "../../../images/vector-shop.jpeg";
import locationIcon from "../../../images/icons/location_on_FILL0_wght400_GRAD0_opsz48.png";
import searchIcon from "../../../images/search-icon1.png";
import "./StoreShow.css";
import { Link } from "react-router-dom";

const StoreShow = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const storeId = useSelector((state) => state.storeLinkReducer.link);
  const storeData = useSelector((state) => state.getStoreShowReducer);
  const [imageShown, setImageShown] = useState(0);

  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: storeId.store_id,
      })
    );
  }, []);

  const changeSearchValue = (e) => {};

  const goToItemsList = (category) => {
     
  }

  return (
    <div className="store-show-container w-full flex flex-col center">
      <MyStore storeData={storeData}/>
    </div>
  );
};

export default StoreShow;
