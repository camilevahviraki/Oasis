import React from "react";
import Countries from "../../components/countries/countries";

const FormR = (props) => {
  const {
    classForm,
    inputsArray,
    submitFunction,
    submitButton,
    submitClass,
    errorMessage,
    inputErrorArr,
    inputWrapperClassName,
    getSelectedCountry,
  } = props;

  return (
    <form className={classForm} onSubmit={submitFunction} id={classForm}>
      {inputsArray.map((inputObj, key) => (
        <>
          {inputObj.type === "select-country" ? (
            <>
            <Countries
              data={inputObj.data}
              inputClass={inputObj.classInput}
              inputLabel={inputObj.label? inputObj.label : null}
              getSelectedCountry={getSelectedCountry}
            />
            {
              inputErrorArr && inputErrorArr[key] === 1 ? (
              <div className="error-input-show"/>
            ) : null}
          </>
          ) : (
            <>
              {inputObj.type === "textarea" ? (
                <div
                  className={
                    inputWrapperClassName
                      ? inputWrapperClassName
                      : "formR-input-wrap"
                  }
                >
                  {inputObj.label ? (
                    <label htmlFor={inputObj.name}>{inputObj.label}</label>
                  ) : (
                    <></>
                  )}
                  <textarea
                    id={inputObj.name}
                    name={inputObj.name}
                    className={
                      inputObj.classInput ? inputObj.classInput : "textarea"
                    }
                    placeholder={inputObj.placeholder}
                  ></textarea>
                  {inputErrorArr && inputErrorArr[key] === 1 ? (
                    <div className="error-input-show"></div>
                  ) : null}
                </div>
              ) : (
                <div
                  className={
                    inputWrapperClassName
                      ? inputWrapperClassName
                      : "formR-input-wrap"
                  }
                >
                  {inputObj.label ? (
                    <label htmlFor={inputObj.name}>{inputObj.label}</label>
                  ) : (
                    <></>
                  )}
                  <input
                    type={inputObj.type}
                    name={inputObj.name}
                    id={inputObj.name}
                    className={
                      inputObj.classInput ? inputObj.classInput : "input"
                    }
                    placeholder={inputObj.placeholder}
                  />
                  {inputErrorArr && inputErrorArr[key] === 1 ? (
                    <div className="error-input-show"></div>
                  ) : null}
                </div>
              )}
            </>
          )}
        </>
      ))}
      <p>{errorMessage}</p>
      <button type="submit" className={submitClass}>
        {submitButton}
      </button>
    </form>
  );
};

export default FormR;
