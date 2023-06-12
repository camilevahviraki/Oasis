import React from 'react';

const InputR = (props) => {
  const {
    name,
    onChangeFunc,
    placeholder,
    classNameInput,
    label,
    type,
    inputContainerClass,
  } = props;
  return (
    <div className={inputContainerClass}>
      {label ? (<label htmlFor={name}>{label}</label>) : (<></>)}
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        onChange={onChangeFunc}
      />
    </div>
  );
};

export default InputR;
