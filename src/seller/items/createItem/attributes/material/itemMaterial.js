import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillPicture } from 'react-icons/ai';
import { getMaterials } from '../../../../../redux/attributes/materialReducer';
import { getItemMaterials } from '../../../../../redux/item_attributes/itemAttributesReducer';
import {
  deleteItemMaterials,
  deleteMessage,
  attachImageToItemMaterials,
} from '../../../../../redux/item/createItemAttributes';
import {
  uploadItemMaterial,
  setCurrentStep,
} from '../../../../../redux/item/createItem';
import Countries from '../../../../../components/countries/countries';
import './itemMaterial.css';

const ItemMaterial = () => {
  const currentItem = useSelector((state) => state.createItemReducer);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [currentMaterialId, setCurrentMaterialId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getItemMaterials(currentItem.item.item_id));
  }, []);

  const materials = useSelector((state) => state.materialReducer);
  const itemMaterials = useSelector((state) => state.itemAttributeReducer.materials);

  const getSelectedMaterial = (data) => {
    setSelectedUnit(data);
  };

  const AddMaterialToItem = () => {
    const obj = {
      name: selectedUnit.name,
      code: selectedUnit.code,
      material_id: selectedUnit.id,
    };
    if (selectedUnit) {
      const checkExist = itemMaterials.filter((elmnt) => elmnt.name === selectedUnit.name);
      if (checkExist.length === 0) {
        dispatch(uploadItemMaterial(obj, currentItem.item.item_id));
      }
    }
  };

  const deleteSizeMessage = useSelector(
    (state) => state.createItemAttributes.messageMaterial,
  );

  if (currentItem.materials) {
    dispatch(getItemMaterials(currentItem.item.item_id));
    dispatch(setCurrentStep(2));
  } else if (deleteSizeMessage) {
    dispatch(getItemMaterials(currentItem.item.item_id));
    dispatch(deleteMessage());
  }

  const attachMaterialImage = (image) => {
    dispatch(attachImageToItemMaterials(currentMaterialId, image));
  };

  return (
    <div className="create-item-capacity-container">
      <h2 className="create-item-colors-picker-title">Material</h2>
      <div className="create-item-material-container-sub">

        <div className="create-item-material-form-wrapp">
          <Countries
            getSelectedCountry={getSelectedMaterial}
            data={materials}
            inputClass="create-item-input-capacity"
            inputWrapperClassName="create-item-input-capacity-wrapp"
            inputLabel="Material"
            placeholder="select material"
            listClass="capacities-unit-list"
          />
          <button
            type="button"
            onClick={AddMaterialToItem}
            className="create-item-add-capacity-button"
          >
            Add
          </button>
        </div>

        <div className="selected-unit-wrapp">
          <h3>Selected Materials</h3>
          {itemMaterials.map((material) => (
            <div className="create-item-color-wrapp">
              <div className="create-item-color-image-preview-wrapp">
                {material.image_url ? (
                  <img
                    src={material.image_url}
                    alt=""
                    className="create-item-color-image-preview"
                  />
                ) : (
                  <>
                    <label
                      htmlFor="image"
                      className="create-item-color-label-image"
                      onClick={() => setCurrentMaterialId(material.id)}
                    >
                      <AiFillPicture />
                    </label>
                    <input
                      name="image"
                      id="image"
                      type="file"
                      accept="image/*"
                      className="create-item-color-input-image"
                      onChange={(e) => attachMaterialImage(e.target.files[0])}
                    />
                  </>
                )}
              </div>
              <div className="create-item-color" />
              <p>{material.name}</p>
              <button
                type="button"
                className="create-item-remove-color"
                onClick={() => dispatch(deleteItemMaterials(material.id))}
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

export default ItemMaterial;
