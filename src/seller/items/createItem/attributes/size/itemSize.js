import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillPicture } from 'react-icons/ai';
import { getSizes } from '../../../../../redux/attributes/sizeReducer';
import { getItemSizes } from '../../../../../redux/item_attributes/itemAttributesReducer';
import {
  deleteItemSizes,
  deleteMessage,
  attachImageToItemSizes,
} from '../../../../../redux/item/createItemAttributes';
import {
  uploadItemSize,
  setCurrentStep,
} from '../../../../../redux/item/createItem';
import Countries from '../../../../../components/countries/countries';
import './itemSize.css';

const ItemSize = () => {
  const currentItem = useSelector((state) => state.createItemReducer);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUnitTilte, setSelectedUnitTitle] = useState(null);
  const [sizeValue, setSizeValue] = useState(null);
  const [currentSizeId, setCurrentSizeId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSizes());
    dispatch(getItemSizes(currentItem.item.item_id));
  }, []);

  const sizesUnit = useSelector((state) => state.sizeReducer);
  const itemSizes = useSelector(
    (state) => state.itemAttributeReducer.sizes,
  );

  const getSelectedSize = (data) => {
    setSelectedUnit(data);
    setSelectedUnitTitle(data.name);
  };

  const AddSizeToItem = () => {
    const obj = {
      name: selectedUnit.name,
      value: sizeValue,
      code: selectedUnit.code,
      size_id: selectedUnit.id,
    };
    if (selectedUnitTilte && sizeValue) {
      dispatch(uploadItemSize(obj, currentItem.item.item_id));
    }
  };

  const deleteSizeMessage = useSelector((state) => state.createItemAttributes.messageSize);

  if (currentItem.sizes) {
    setSizeValue(null);
    dispatch(getItemSizes(currentItem.item.item_id));
    dispatch(setCurrentStep(2));
  } else if (deleteSizeMessage) {
    dispatch(getItemSizes(currentItem.item.item_id));
    dispatch(deleteMessage());
    setSizeValue(null);
  }

  const attachSizeImage = (image) => {
    dispatch(attachImageToItemSizes(currentSizeId, image));
  };

  return (
    <div className="create-item-capacity-container">
      <h2 className="create-item-colors-picker-title">Size</h2>
      <div className="create-item-capacity-container-sub">
        <div className="create-item-capacity-form-wrapper">
          <div className="create-item-capacity-form-wrapp">
            <h2>Set Size Unit</h2>
            <Countries
              getSelectedCountry={getSelectedSize}
              data={sizesUnit}
              inputClass="create-item-input-capacity"
              inputWrapperClassName="create-item-input-capacity-wrapp"
              inputLabel="Size Unit"
              placeholder="select size unit"
              listClass="capacities-unit-list"
            />
          </div>
          <form className="form-input-capacity-container">
            <h3>Add capacity</h3>
            <div className="form-input-capacity-wrapper">
              <label htmlFor="capacity">Input size value</label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                value={sizeValue}
                placeholder="120"
                onChange={(e) => setSizeValue(e.target.value)}
              />
              {selectedUnitTilte ? <span>{selectedUnit.code}</span> : <></>}
              <button
                type="button"
                onClick={AddSizeToItem}
                className="create-item-add-capacity-button"
              >
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="selected-unit-wrapp">
          <h3>Added Sizes</h3>
          {itemSizes.map((size) => (
            <div className="create-item-color-wrapp">
              <div className="create-item-color-image-preview-wrapp">
                {size.image_url ? (
                  <img
                    src={size.image_url}
                    alt=""
                    className="create-item-color-image-preview"
                  />
                ) : (
                  <>
                    <label
                      htmlFor="image_size"
                      className="create-item-color-label-image"
                      onClick={() => setCurrentSizeId(size.id)}
                    >
                      <AiFillPicture />
                    </label>
                    <input
                      name="image_size"
                      id="image_size"
                      type="file"
                      accept="image/*"
                      className="create-item-color-input-image"
                      onChange={(e) => attachSizeImage(e.target.files[0])}
                    />
                  </>
                )}
              </div>

              <div className="create-item-color">{size.value}</div>
              <p>
                {size.code}
                (
                {size.name}
                )
              </p>
              <button
                type="button"
                className="create-item-remove-color"
                onClick={() => dispatch(deleteItemSizes(size.id))}
              >
                remove
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ItemSize;
