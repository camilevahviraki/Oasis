import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setItemLink } from '../../redux/itemLink/itemLinkreducer';
import { getHomeItems, homeSearchItem } from '../../redux/home/homeReducer';
import { clearStoreData } from '../../redux/stores/getStoreShowReducer';
import ItemsList from '../../seller/items/itemList/ItemIndex';
import SearchBar from '../../reusable/serach-bar/SearchBar';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  useEffect(() => {
    dispatch(clearStoreData());
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
      // console.log('add to search_suggestions table =>', searchedQuery);
    }
  }, [homeData.data.length]);

  return (
    <div className="home-container">
      <div className="home-search-bar-container fixed top-[50px] z-[8] w-full bg-white shadow-md py-4 px-6 flex items-center gap-8">
        <h2 className="home-title text-2xl font-bold text-[var(--oasis-dark)] whitespace-nowrap">{t('common.home')}</h2>
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} instantSearch={false} homePage />
        </div>
      </div>
      {data.length === 0 && searchedData ? (
        <div className="oops-cooldnt-find-a-match">{t('common.no_results_found')}</div>
      ) : (
        <ItemsList itemsData={data} />
      )}
    </div>
  );
};

export default Home;
