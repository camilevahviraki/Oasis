import React from 'react';
import Countries from '../../components/countries/countries';

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
      {inputsArray.map((inputObj, key) => {
        const {
          classInput,
          label,
          name,
          onChangeFunc,
          placeholder,
          value,
          type,
          step,
        } = inputObj;

        return (
          <>
            {type === 'select-country' ? (
              <>
                <Countries
                  data={inputObj.data}
                  inputClass={classInput}
                  inputLabel={label || null}
                  getSelectedCountry={getSelectedCountry}
                  placeholder={placeholder || null}
                />
                {inputErrorArr && inputErrorArr[key] === 1 ? (
                  <div className="error-input-show" />
                ) : null}
              </>
            ) : (
              <>
                {type === 'textarea' ? (
                  <div className={inputWrapperClassName || 'formR-input-wrap'}>
                    {label ? <label htmlFor={name}>{label}</label> : <></>}
                    {value ? (
                      <textarea
                        id={name}
                        name={name}
                        className={classInput || 'textarea'}
                        placeholder={placeholder}
                        onChange={onChangeFunc || null}
                        value={value}
                      />
                    ) : (
                      <textarea
                        id={name}
                        name={name}
                        className={classInput || 'textarea'}
                        placeholder={placeholder}
                        onChange={onChangeFunc || null}
                      />
                    )}
                    {inputErrorArr && inputErrorArr[key] === 1 ? (
                      <div className="error-input-show" />
                    ) : null}
                  </div>
                ) : (
                  <div className={inputWrapperClassName || 'formR-input-wrap'}>
                    {label ? <label htmlFor={name}>{label}</label> : <></>}
                    {value ? (
                      <input
                        type={type}
                        name={name}
                        id={name}
                        className={classInput || 'input'}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChangeFunc || null}
                      />
                    ) : (
                      <>
                        {step ? (
                          <input
                            type={type}
                            name={name}
                            id={name}
                            className={classInput || 'input'}
                            placeholder={placeholder}
                            onChange={onChangeFunc || null}
                            step={step}
                          />
                        ) : (
                          <input
                            type={type}
                            name={name}
                            id={name}
                            className={classInput || 'input'}
                            placeholder={placeholder}
                            onChange={onChangeFunc || null}
                          />
                        )}
                      </>
                    )}

                    {inputErrorArr && inputErrorArr[key] === 1 ? (
                      <div className="error-input-show" />
                    ) : null}
                  </div>
                )}
              </>
            )}
          </>
        );
      })}
      <p>{errorMessage}</p>
      <button type="submit" className={submitClass}>
        {submitButton}
      </button>
    </form>
  );
};

export default FormR;
