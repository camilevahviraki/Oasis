import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStoreTypes, createStoreProgress } from "../../../redux/stores/createStoreReducer";

const CreateStoreCategories = (props) => {
  const [selected, setSelected] = useState([]);
  const storeData = useSelector(state => state.createStoresReducer);
  const userData = useSelector(state => state.authenticationReducer);
  const token = userData.token;
  const dispatch = useDispatch();

  const categories = [
    { id: 0, name: "Chemical" },
    { id: 1, name: "Pharmacie" },
    { id: 2, name: "Electronic" },
    { id: 3, name: "Mechanic" },
    { id: 4, name: "Clothes" },
    { id: 5, name: "Construction" },
    { id: 6, name: "Food" },
    { id: 7, name: "Restaurent" },
    { id: 8, name: "Hotel" },
    { id: 9, name: "Banks" },
    { id: 10, name: "Telecom" },
    { id: 11, name: "Others" },
  ];

  const addCategory = (category) => {
    if(selected.some(e => e.name === category.name)){
        const newSelected =  selected.filter((item) => item.name !== category.name);
        setSelected(newSelected);
    }else{
        setSelected([...selected, category]);
    }
  };

  const SubmitCategories = () => {
    let formData = new FormData();
    categories.forEach((category) => {
      formData.append("categories[]", category);
    });

    dispatch(addStoreTypes({
      categories: selected,
      step: 2,
      store_id: storeData.storeId.store_id,
      user_id: userData.user.id,
    }, token));
  };

  return (
    <div 
      className="create-store-categories" 
      style={props.progress === 2? {display: 'block'}: {display: 'none'}}
    >
      <h2>Select store categories</h2>
      {categories.map((category, index) => (
        <div key={category.id} onClick={() => {addCategory(category); console.log('category =>', category, 'selected =>', selected)}}>
          <h4
            className={
              selected.some(e => e.name === category.name)
                ? "store-type selected-type"
                : "store-type"
            }
          >
            {category.name}
          </h4>
        </div>
      ))}
      <div>
        <button type="button" onClick={() => dispatch(createStoreProgress())}>{'<'}Back</button>
        <button type="button" onClick={SubmitCategories}>
          Next{">"}
        </button>
      </div>
    </div>
  );
};

export default CreateStoreCategories;
