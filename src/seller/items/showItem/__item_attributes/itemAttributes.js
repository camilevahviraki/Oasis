import React, { useEffect, useState } from "react";
import Attribute from "../__attribute/Attribute";
import "./itemAttributes.css";

const ItemAttributes = (props) => {
  const { data, showAttributeImage, handleArrayOfSelected } = props;
  const [arraySelected, setArrayOfSelected] = useState([]);

  const selectAttribute = (data) => {
    console.log('--------------------------------',data)
    showAttributeImage(data);
    const newArr = arraySelected.filter(
      (element) => element.title !== data.title
    );
    const checkSelected = newArr.filter(
      (element) => element.attribute.name === data.attribute.name
    );
    if (checkSelected.length === 0) {
      setArrayOfSelected(newArr);
      setArrayOfSelected([...newArr, data]);
    }
    // handleArrayOfSelected(arraySelected);
    
  };

  useEffect(() => {
    handleArrayOfSelected(arraySelected);
  }, [arraySelected]);
  
  const checkSelected = (data) => {
    const checkSelected = arraySelected.filter((element) => {
      return (
        element.attribute.id === data.attribute.id &&
        element.title === data.title
      );
    });
    if (checkSelected.length > 0) {
      return true;
    }
    return false;
  };

  const assignSelectedTitle = (data) => {
    let responseData = { value: null, name: null };
    data.values.forEach((element) => {
      const checkSelected = arraySelected.filter((item) => {
        return item.attribute.id === element.id && item.title === data.title;
      });
      if (checkSelected.length > 0) {
        responseData = checkSelected[0].attribute;
      }
    });
    return responseData;
  };

  return (
    <div className="item-attributes-container">
      {data ? (
        data.map((attributeType) => (
          <div className="item-show-details-attributes-type">
            <p className="attribute-title">
              {attributeType.title}:{" "}
              <span>
                {assignSelectedTitle(attributeType).value}
                {assignSelectedTitle(attributeType).name}
              </span>{" "}
            </p>
            <div className="item-show-details-attributes-wrapp">
              {attributeType.values.map((attribute, key) => (
                <Attribute
                  attribute={attribute}
                  title={attributeType.title}
                  selectAttribute={selectAttribute}
                  current={checkSelected({
                    title: attributeType.title,
                    attribute,
                  })}

                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemAttributes;
