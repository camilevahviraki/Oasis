import React, { useState } from "react";

const Attribute = (props) => {
  const { attribute, title, selectAttribute, current } = props;
  const [selectedAttr, setSelectedAttr] = useState(null);

  const setAttribute = () => {
    selectAttribute({ attribute, title });
  };
  

  const assignChildAttribute = () => {
    if (title === "Capacity") {
      return (
        <span>
          {attribute.value}
          {attribute.code}
        </span>
      );
    } else if (title === "Size") {
      return (
        <span>
          {attribute.value}
          {attribute.code}
        </span>
      );
    } else if (title === "Material") {
      return <span>{attribute.name}</span>;
    } else if (title === "Color") {
      return (
        <>
          <div
            className="attribute-color-background"
            style={{backgroundColor: attribute.hex_code}}
          >{attribute.name}</div>
        </>
      );
    }
  };

  return (
    <div
      className={
        current
          ? "item-attribute-wrapp current-attribute"
          : "item-attribute-wrapp"
      }
      onClick={setAttribute}
    >
      {
        assignChildAttribute()
      }
    </div>
  );
};

export default Attribute;
