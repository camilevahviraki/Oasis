import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setItemLink } from '../../redux/itemLink/itemLinkreducer';
import { getHomeItems } from '../../redux/home/homeReducer';
import { clearStoreData } from '../../redux/stores/getStoreShowReducer';
import ItemsList from '../../seller/items/itemList/ItemIndex';
import SearchBar from '../../reusable/serach-bar/SearchBar';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(clearStoreData());
    dispatch(getHomeItems());
  }, []);

  const data = useSelector((state) => state.homeReducer);

  const setStoreItemLink = (link, id) => {
    dispatch(setItemLink(link, id));
  };

  return (
    <div className="home-container">
      <SearchBar />
      <ItemsList itemsData={data} />
    </div>
  );
};

export default Home;
