import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillPicture } from 'react-icons/ai';
import { getColors } from '../../../../../redux/attributes/colorReducer';
import { getItemColors } from '../../../../../redux/item_attributes/itemAttributesReducer';
import {
  deleteItemColors,
  deleteMessage,
  attachImageToItemColors,
} from '../../../../../redux/item/createItemAttributes';
import {
  uploadItemColor,
  setCurrentStep,
} from '../../../../../redux/item/createItem';
import './itemColor.css';

const ItemColor = () => {
  const [currentColorId, setCurrentColorId] = useState(null);
  const currentItem = useSelector((state) => state.createItemReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
    dispatch(getItemColors(currentItem.item.item_id));
  }, []);

  const colors = useSelector((state) => state.colorReducer);
  const itemColors = useSelector((state) => state.itemAttributeReducer.colors);
  const deleteColorMessage = useSelector(
    (state) => state.createItemAttributes.message,
  );

  const addColor = (color) => {
    const checkColor = itemColors.filter((el) => el.name === color.name);
    if (checkColor.length === 0) {
      dispatch(uploadItemColor(color, currentItem.item.item_id));
    }
  };

  if (currentItem.colors) {
    dispatch(getItemColors(currentItem.item.item_id));
    dispatch(setCurrentStep(2));
  } else if (deleteColorMessage) {
    dispatch(getItemColors(currentItem.item.item_id));
    dispatch(deleteMessage());
  }

  const uploadColorImage = (image) => {
    dispatch(attachImageToItemColors(currentColorId, image));
  };

  return (
    <div className="item-color-container-main">
      <h2 className="create-item-colors-picker-title">Color</h2>
      <div className="item-color-container">
        <div className="create-item-colors-picker">
          <h2 className="create-item-colors-picker-title">Pick a color</h2>
          <div className="create-item-colors-wrapp">
            {colors.map((color) => (
              <div
                key={color.hex_code}
                className="create-item-color"
                style={{ backgroundColor: color.hex_code }}
                onClick={() => addColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="create-item-selected-colors">
          <h2>Selected colors</h2>
          {itemColors.map((color) => (
            <div className="create-item-color-wrapp" key={color.id}>
              <div className="create-item-color-image-preview-wrapp">
                {color.image_url ? (
                  <img
                    src={color.image_url}
                    alt=""
                    className="create-item-color-image-preview"
                  />
                ) : (
                  <>
                    <label
                      htmlFor="image"
                      className="create-item-color-label-image"
                      onClick={() => setCurrentColorId(color.id)}
                    >
                      <AiFillPicture />
                    </label>
                    <input
                      name="image"
                      id="image"
                      type="file"
                      accept="image/*"
                      className="create-item-color-input-image"
                      onChange={(e) => uploadColorImage(e.target.files[0])}
                    />
                  </>
                )}
              </div>

              <div
                className="create-item-color"
                style={{ backgroundColor: color.hex_code }}
              />

              <p>{color.name}</p>
              <button
                type="button"
                className="create-item-remove-color"
                onClick={() => dispatch(deleteItemColors(color.id, color.id))}
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

export default ItemColor;
