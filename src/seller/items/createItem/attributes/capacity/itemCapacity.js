import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPicture } from "react-icons/ai";
import { getCapacities } from "../../../../../redux/attributes/capacityReducer";
import { getItemCapacities } from "../../../../../redux/item_attributes/itemAttributesReducer";
import {
  deleteItemCapacities,
  deleteMessage,
  attachImageToItemCapacity,
} from "../../../../../redux/item/createItemAttributes";
import {
  uploadItemCapacity,
  setCurrentStep,
} from "../../../../../redux/item/createItem";
import Countries from "../../../../../components/countries/countries";
import "./itemCapacity.css";

const ItemCapacity = () => {
  const currentItem = useSelector((state) => state.createItemReducer);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUnitTilte, setSelectedUnitTitle] = useState(null);
  const [capacityValue, setCapacityValue] = useState(null);
  const [currentCapacityId, setCurrentCapacityId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCapacities());
    dispatch(getItemCapacities(currentItem.item.item_id));
  }, []);

  const capacities = useSelector((state) => state.capacityReducer);
  const itemCapacities = useSelector(
    (state) => state.itemAttributeReducer.capacities
  );

  const getSelectedCapacity = (data) => {
    setSelectedUnit(data);
    setSelectedUnitTitle(data.name);
  };

  const AddCapacityToItem = () => {
    const obj = {
      name: selectedUnit.name,
      value: capacityValue,
      code: selectedUnit.code,
      capacity_unit_id: selectedUnit.id,
    };
    if (selectedUnitTilte && capacityValue) {
      console.log("add =>", obj, currentItem);
      dispatch(uploadItemCapacity(obj, currentItem.item.item_id));
    }
  };

  const deleteCapacityMessage = useSelector(
    (state) => state.createItemAttributes.messageCapacity
  );

  if (currentItem.capacities) {
    setCapacityValue(null);
    dispatch(getItemCapacities(currentItem.item.item_id));
    dispatch(setCurrentStep(2));
  } else if (deleteCapacityMessage) {
    dispatch(getItemCapacities(currentItem.item.item_id));
    dispatch(deleteMessage());
    setCapacityValue(null);
  }

  const uploadCapacityImage = (image) => {
    dispatch(attachImageToItemCapacity(currentCapacityId, image));
  };

  return (
    <div className="create-item-capacity-container">
       <h2 className="create-item-colors-picker-title">Capacity</h2>
      <div className="create-item-capacity-container-sub">
        <div className="create-item-capacity-form-wrapper">
          <div className="create-item-capacity-form-wrapp">
            <h2>Set Capacity Unit</h2>
            <Countries
              getSelectedCountry={getSelectedCapacity}
              data={capacities}
              inputClass={"create-item-input-capacity"}
              inputWrapperClassName={"create-item-input-capacity-wrapp"}
              inputLabel={"Capacity Unit"}
              placeholder={"select capacity unit"}
              listClass={"capacities-unit-list"}
            />
          </div>
          <form className="form-input-capacity-container">
            <h3>Add capacity</h3>
            <div className="form-input-capacity-wrapper">
              <label htmlFor="capacity">Input Capacity</label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                value={capacityValue}
                placeholder="120"
                onChange={(e) => setCapacityValue(e.target.value)}
              />
              {selectedUnitTilte ? <span>{selectedUnit.code}</span> : <></>}
              <button
                type="button"
                onClick={AddCapacityToItem}
                className="create-item-add-capacity-button"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="selected-unit-wrapp">
          <h3>Added Capacities</h3>
          {itemCapacities.map((capacity) => (
            <div className="create-item-color-wrapp">
              <div className="create-item-color-image-preview-wrapp">
                {capacity.image_url ? (
                  <img
                    src={capacity.image_url}
                    alt=""
                    className="create-item-color-image-preview"
                  />
                ) : (
                  <>
                    <label
                      htmlFor="image"
                      className="create-item-color-label-image"
                      onClick={() => setCurrentCapacityId(capacity.id)}
                    >
                      <AiFillPicture />
                    </label>
                    <input
                      name="image"
                      id="image"
                      type="file"
                      accept="image/*"
                      className="create-item-color-input-image"
                      onChange={(e) => uploadCapacityImage(e.target.files[0])}
                    />
                  </>
                )}
              </div>

              <div className="create-item-color">{capacity.value}</div>
              <p>
                {capacity.code}
                {"("}
                {capacity.name}
                {")"}
              </p>
              <button
                type="button"
                className="create-item-remove-color"
                onClick={() => dispatch(deleteItemCapacities(capacity.id))}
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

export default ItemCapacity;
