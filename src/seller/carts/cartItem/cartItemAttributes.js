import React from 'react';

const CartItemAttributes = (props) => {
  const { itemAttributes } = props;
  return (
    <div className="cart-item-attribute-wrapp">
      {itemAttributes.map((attribute) => (
        <div className="cart-item-attribute" key={attribute.title}>
          <h5 className="cart-item-attribute-title">
            {attribute.title}
            :
            <span>
              {attribute.values.value}
              {attribute.values.name}
            </span>
            {
              attribute.title === 'Color'
                ? (
                  <span
                    className="cart-item-attribute-color"
                    style={{ backgroundColor: attribute.values.hex_code }}
                  />
                )
                : <></>
            }
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CartItemAttributes;
