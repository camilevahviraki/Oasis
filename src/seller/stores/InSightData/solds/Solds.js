import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../../reusable/serach-bar/SearchBar';
import { BsFilterLeft } from 'react-icons/bs';
import { getStoreSales } from '../../../../redux/store_sales/getStoreSales';
import CalculatePrice from '../../../../reusable/calculatePrice/calculatePrice';
import { format } from 'date-fns';
import './solds.css';

const Solds = (props) => {

    const dispatch = useDispatch();
    const {storeData} = props;
    const [showDateFilters, setShowDateFilters] = useState(false);
    const [selectedDataFilter, setSelectedDataFilter] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDateForm, setShowForm] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    const transformDateFormat = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    }  

    useEffect(() => {
        if(storeData.id) {
          dispatch(getStoreSales(storeData.id));
        }
      }, []);
    
    const storeSales = useSelector(state => state.storeSalesItemsReducer); 

    const titles = {
        name: 'Product',
        picture: 'Picture',
        price: 'Price',
        quantity: 'Qt',
        price_paid: 'price paid',
        created_at: 'Added on',
        sold_on: 'Sold on',
        quantity_left: 'In Stock'
    }

    const dataFilters = [
        { name: 'This month', key: 'this_month' },
        { name: 'This week' ,key: 'this_week' },
        { name: 'Today' , key: 'today'},
        {name: 'Past month', key: 'past_month'},
        { name: 'All' , key: 'all'},
        { name: 'From date up to ...', key: 'range' },
    ];

    const handleSearch = (value) => {
    //    console.log(value);
    }

    const handleSearchDateFilter = (ident) => {
        const searchParams = new URLSearchParams();
        searchParams.append('dataFilter', dataFilters[ident].key);
        setSelectedDataFilter(ident);
        setShowDateFilters(false);
        if(storeData.id) {
            if(dataFilters[ident].key === 'range'){
                setShowForm(true);
            }else {
                dispatch(getStoreSales(storeData.id, searchParams));
            }
        }
    }

    const handleRangeFilter = (e) => {
      e.preventDefault();
      const searchParams = new URLSearchParams();
      searchParams.append('dataFilter', 'range');
      if(!startDate || !endDate){
        dispatch(getStoreSales(storeData.id));
      }else {
        searchParams.append('start_date', startDate);
        searchParams.append('end_date', endDate);
        dispatch(getStoreSales(storeData.id, searchParams));
        setShowForm(false);
      }
    }

    return (
        <>

            <div className='insight-data-solds-filter'>
                <h4 className='search-filter' onClick={() => setShowDateFilters(!showDateFilters)}>
                    <BsFilterLeft />
                    <span>{dataFilters[selectedDataFilter].name}</span>
                </h4>
                <SearchBar onSearch={handleSearch} instantSearch />
                {
                    showDateFilters ? (
                        <div className='search-categories-list' id="solds-search-categories-list">
                            {
                                dataFilters.map((category, key) => (
                                    <p
                                        key={category.name}
                                        className='search-categories-list-category'
                                        onClick={() => handleSearchDateFilter(key)}
                                    >
                                        <span></span> {category.name}
                                    </p>
                                ))
                            }
                        </div>
                    ) :
                        (<></>)
                }
                {
                    showDateForm?(
                        <div className='search-categories-list' id="solds-search-categories-list">
                            <form className="search-categories-list-form" onSubmit={handleRangeFilter}>
                                <label htmlFor='start_date'>Start date</label>
                                <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)}   max={endDate? endDate:yesterdayString}/>
                                <label htmlFor='end_date'>End date</label>
                                <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)}  min={startDate?startDate:"2022-01-01"}  max={today}/>
                                <button type='submit'>Set Filter</button>
                            </form>
                        </div>
                    ):(<></>)
                }

            </div>

            <div className="insight-table-wrapp">
                <div className="insight-table-row">
                    <div className="insight-table-cell-title">{titles.name}</div>
                    <div className="insight-table-cell-title">{titles.picture}</div>
                    <div className="insight-table-cell-title">{titles.price}</div>
                    <div className="insight-table-cell-title">{titles.quantity}</div>
                    <div className="insight-table-cell-title">{titles.quantity_left}</div>
                    <div className="insight-table-cell-title">{titles.price_paid}</div>
                    <div className="insight-table-cell-title">{titles.created_at}</div>
                    <div className="insight-table-cell-title">{titles.sold_on}</div>
                </div>

                {
                    storeSales.map((el) => {
                        const { item_data, item_id, price_paid, quantity, store_id, unit_price, updated_at } = el;
                        const { items_images, main_name, created_at } = item_data;    
                        const quantity_left = item_data.quantity;
                        const sold_on = el.created_at;
                        return (
                            <div className="insight-table-row">
                                <div className="insight-table-cell">{main_name}</div>
                                <div className="insight-table-cell">{"picture"}</div>
                                <div className="insight-table-cell"> <CalculatePrice price={unit_price}/></div>
                                <div className="insight-table-cell">{quantity}</div>
                                <div className="insight-table-cell">{quantity_left}</div>
                                <div className="insight-table-cell"><CalculatePrice price={price_paid}/></div>
                                <div className="insight-table-cell"> {transformDateFormat(created_at)}</div>
                                <div className="insight-table-cell">{transformDateFormat(sold_on)}</div>
                            </div>
                        )
                    })
                }
            </div>
        </>

    )
}

export default Solds