import React from 'react';
import { useSelector } from "react-redux";
import Description from './create_description/description';

const CreateItemDescription = () => {
    const createItemData = useSelector((state) => state.createItemReducer);
    return <div className="create-item-container">{createItemData.step === 2 ? <Description /> : <></>}</div>;
};

export default CreateItemDescription;