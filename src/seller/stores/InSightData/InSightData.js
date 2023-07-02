import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiListPlus } from 'react-icons/bi';
import { TbReportMoney } from 'react-icons/tb';
import { SlGraph } from 'react-icons/sl';
import { ImLocation } from 'react-icons/im';
import { MdProductionQuantityLimits } from 'react-icons/md';
import Solds from './solds/Solds';
import InsightDataItemsList from './items_list/ItemsList';
import NewSale from './newSale/newSale';
import Graphics from './graphics/Graphics';
import { getStoresShow } from '../../../redux/stores/getStoreShowReducer';
import './InsightData.css';

const InSightData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token_id } = useParams();

  const userData = useSelector((state) => state.authenticationReducer);
  const [page, setPage] = useState('');
  const [changePage, setChangePage] = useState(false);

  useEffect(() => {
    dispatch(
      getStoresShow({
        user_id: userData.user.id,
        store_id: token_id,
      })
    );
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramValue = searchParams.get('page');

    setPage(paramValue);
  }, [changePage]);
  const storeData = useSelector((state) => state.getStoreShowReducer);

  const {
    country,
    location,
    name,
  } = storeData;

  const pageLink = `../store/${token_id}/analysis?page=`;

  useEffect(() => {
    if (!page) {
      navigate(`${pageLink}sales`);
    }
  }, [page]);

  const links = [
    { name: 'New sales', icon: <BiListPlus />, path: 'new-sale' },
    { name: 'Sales', icon: <TbReportMoney />, path: 'sales' },
    { name: 'All products', icon: <MdProductionQuantityLimits />, path: 'all-products' },
    { name: 'Graphs', icon: <SlGraph />, path: 'graphs' }
  ];

  const pages = [
    { link: 'sales', function: <Solds storeData={storeData}/> },
    { link: 'all-products', function: <InsightDataItemsList /> },
    { link: 'graphs', function: <Graphics storeData={storeData}/> },
    { link: 'new-sale', function: <NewSale redirectPage={() => setChangePage(!changePage)}/> },
  ]

  return (
    <div className="insight-main-wrapp">
      <div className='insight-data-header'>
        <div className='insight-data-header-store-desc'>
          <h2>
            {
              name? name: ''
            }
            {' '}store
            </h2>
          <p className='insight-data-store-location'><span><ImLocation /></span>{name? (<>{location},{' '}{country.name}</>): ''}</p>
        </div>

        <div className='insight-data-header-links'>
          {
            links.map((link) => (
              <div className={page !== link.path ?
                'insight-data-header-link-wrapper'
                :
                'insight-data-header-link-wrapper insight-data-link-active'}
              >
                <Link
                  className='insight-data-header-link'
                  to={`${pageLink}${link.path}`}
                  onClick={() => setChangePage(!changePage)}
                > <span>{link.icon}</span> {link.name}</Link>
                {
                  page === link.path ?
                    (<div className='insight-data-header-link-triangle-show'></div>) : (<></>)
                }
              </div>
            ))
          }
        </div>
      </div>
      <div className='insight-data-page-wrapp'>
        {/* <Link
          onClick={() => setChangePage(!changePage)}
          to={`${pageLink}new-sale`}
          className='insight-data-more-sales'
        >
          <BiListPlus className='icon-more-sales' /> New sales
        </Link> */}
        {
          pages.map((currentPage) => {
            if (currentPage.link === page) {
              return currentPage.function;
            } else {
              return null
            }
          })
        }
      </div>


    </div>
  );
};

export default InSightData;
