import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  setAttributeStep,
} from "../../../../../redux/item/createItem";
import ItemCapacity from "../../attributes/capacity/itemCapacity";
import ItemColor from "../../attributes/color/itemColor";
import ItemMaterial from "../../attributes/material/itemMaterial";
import ItemSize from "../../attributes/size/itemSize";

const Attributes = () => {
  const attributesRef = useRef(null);
  const dispatch = useDispatch();
  const createItemData = useSelector((state) => state.createItemReducer);
  const { attributeStep } = createItemData;
  const [scrollTo, setScrollTo] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const attributesPages = [1, 2, 3, 4];

  console.log(createItemData);

  const gotToNextAttribute = () => {
    if (attributeStep < attributesPages.length) {
      dispatch(setAttributeStep(attributeStep + 1));
    }
  };

  const gotToPreviousAttribute = () => {
    if (attributeStep > 1) {
      dispatch(setAttributeStep(attributeStep - 1));
    }
  };

  useEffect(() => {
    setContainerWidth(attributesRef.current.offsetWidth);
  }, []);

  if (scrollTo !== attributeStep) {
    if (attributesRef.current) {
      attributesRef.current.scrollTo({
        top: 0,
        left: (attributeStep - 1) * containerWidth,
        behavior: "smooth",
      });
      setScrollTo(attributeStep);
    }
  }

  return (
    <div className="create-item-attributes-container">
      <button
        type="button"
        className="got-to-attribute-button left-button"
        onClick={gotToPreviousAttribute}
      >
        {"<"}
      </button>
      <button
        type="button"
        className="got-to-attribute-button right-button"
        onClick={gotToNextAttribute}
      >
        {">"}
      </button>
      <div className="create-item-attributes" ref={attributesRef}>
        <ItemColor />
        <ItemCapacity />
        <ItemSize />
        <ItemMaterial />
      </div>
      <div className="create-item-attribute-dots-wrapp">
        {attributesPages.map((dot) => (
          <div
            className={
              attributeStep === dot
                ? "create-item-attribute-dot current-step-dot"
                : "create-item-attribute-dot"
            }
            onClick={() => dispatch(setAttributeStep(dot))}
          >
            {dot}
          </div>
        ))}
      </div>
      <button
        onClick={() => dispatch(setCurrentStep(3))}
        className="button-test-skip-attributes"
      >
        {"> "}Preview product 
      </button>
    </div>
  );
};

export default Attributes;
