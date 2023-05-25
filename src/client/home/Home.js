import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setItemLink } from '../../redux/itemLink/itemLinkreducer';
import { getHomeItems, homeSearchItem } from '../../redux/home/homeReducer';
import { clearStoreData } from '../../redux/stores/getStoreShowReducer';
import ItemsList from '../../seller/items/itemList/ItemIndex';
import SearchBar from '../../reusable/serach-bar/SearchBar';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  useEffect(() => {
    // dispatch(clearStoreData());
    dispatch(getHomeItems());
  }, []);

  const homeData = useSelector((state) => state.homeReducer);
  const {
    data,
    searchedData,
  } = homeData;

  const [searchedQuery, setSearchedQuery] = useState(null);

  const setStoreItemLink = (link, id) => {
    dispatch(setItemLink(link, id));
  };

  const handleSearch = (value) => {
    const queryData = {
      query: value,
      userId: userData.user.id,
    };
    dispatch(homeSearchItem(queryData));
    setSearchedQuery(queryData);
  };

  useEffect(() => {
    if (searchedData && data.length > 0) {
      //  add to search_suggestions table;
      console.log('add to search_suggestions table =>', searchedQuery);
    }
  }, [homeData.data.length]);

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} instantSearch />
      {data.length === 0 && searchedData ? (
        <div className="oops-cooldnt-find-a-match">Oops! Could'nt find a match</div>
      ) : (
        <ItemsList itemsData={data} />
      )}
    </div>
  );
};

export default Home;
