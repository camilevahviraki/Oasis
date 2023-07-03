import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import { BiSelectMultiple } from 'react-icons/bi';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { getItems } from '../../../../redux/item/getItem';
import { massDeleteItems, resetMassDeleteItemsResponse } from '../../../../redux/item/massDelete';
import { deleteQuantityResponse } from '../../../../redux/item/updatedItemQuantity';
import SingleItem from './singleItem';
import './ItemsList.css';

const InsightDataItemsList = (props) => {
  const { newSale, setSelctedItem } = props;
  const dispatch = useDispatch();
  const { token_id } = useParams();
  const [categoryName, setCategoryName] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allowSelect, setAllowSelect] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  useEffect(() => {
    dispatch(
      getItems({
        category: categoryName,
        store_id: token_id,
      }),
    );
  }, []);

  const storeItems = useSelector((state) => state.getItemsList);
  const deleteItemsResponse = useSelector((state) => state.massDeleteItemsReducer);
  const updateQuantityResponse = useSelector((state) => state.updateItemQuantity.message);
  const {
    searchedData,
    itemsList,
  } = storeItems;

  const checkProduct = (id) => {
    if (!selectedProducts.includes(id)) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      const newData = selectedProducts.filter((el) => el !== id);
      setSelectedProducts(newData);
    }
  };

  const handleDelete = () => {
    dispatch(massDeleteItems(selectedProducts));
    setDeleteLoader(true);
  };

  useEffect(() => {
    if (deleteItemsResponse.message === 'Items deleted successfully') {
      setAllowSelect(false);
      setDeleteLoader(false);
      dispatch(resetMassDeleteItemsResponse());
      dispatch(getItems({
        category: categoryName,
        store_id: token_id,
      }));
    }
  }, [deleteItemsResponse]);

  return (
    <div className="insight-data-items-list-wrapp">
      <div className="insight-data-items-list-top-buttons">
        {
                    allowSelect ? (
                      <button
                        className="insight-data-items-list-button-select items-del-button"
                        style={{ color: 'orange' }}
                        type="button"
                        onClick={() => handleDelete()}
                      >
                        <span><MdOutlineDeleteSweep /></span>
                        {
                                deleteLoader ? (<FiLoader className="button-loader" color="orange" />) : ('Delete selected')
                            }

                      </button>
                    ) : (<></>)
                }
        {!newSale ? (
          <button
            type="button"
            className="insight-data-items-list-button-select"
            onClick={() => { setAllowSelect(!allowSelect); setSelectedProducts([]); }}
          >
            <span><BiSelectMultiple /></span>
            {' '}
            Select
          </button>

        ) : (<></>)}
      </div>
      {
                itemsList.map((item) => (
                  <SingleItem
                    key={item.id}
                    itemData={item}
                    checkProduct={checkProduct}
                    setSelctedItem={setSelctedItem}
                    selectedProducts={selectedProducts}
                    newSale={newSale}
                    allowSelect={allowSelect}
                  />
                ))
            }
    </div>
  );
};

export default InsightDataItemsList;
