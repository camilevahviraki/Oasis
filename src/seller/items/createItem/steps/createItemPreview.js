import React from "react";
import { useSelector } from "react-redux";
import Preview from "./create_preview/preview";
import './create_preview/createItemPreview.css';

const CreateItemPreview = () => {
  const createItemData = useSelector((state) => state.createItemReducer);
  return (
    <div className="create-item-preview-container">
      {createItemData.step === 3 ? <Preview /> : <></>}
    </div>
  );
};

export default CreateItemPreview;
