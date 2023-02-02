import React from 'react'

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
  } = props;
    
  return (
    <form className={classForm} onSubmit={submitFunction}>
        {inputsArray.map((inputObj, key) => (<>
          {
            inputObj.type === 'textarea'?
            (
              <div className={inputWrapperClassName? inputWrapperClassName :'formR-input-wrap'}>
                {
                  inputObj.label?(<label htmlFor={inputObj.name}>{inputObj.label}</label>):(<></>)
                }
                <textarea
                  id={inputObj.name}
                  name={inputObj.name}
                  className={inputObj.classInput? inputObj.classInput : 'textarea'}
                  placeholder={inputObj.placeholder}
                >
                </textarea>
                {inputErrorArr && inputErrorArr[key] === 1?(
              <div className='error-input-show'></div>)
              : 
              null
            }

              </div>              
            ):
            (
              <div className={inputWrapperClassName? inputWrapperClassName :'formR-input-wrap'}>
              {
                inputObj.label?(<label htmlFor={inputObj.name}>{inputObj.label}</label>):(<></>)
              }
              <input
              type={inputObj.type}
              name={inputObj.name}
              id={inputObj.name}
              className={inputObj.classInput? inputObj.classInput : 'input'}
              placeholder={inputObj.placeholder}
              />
            {
              inputErrorArr && inputErrorArr[key] === 1?(<div className='error-input-show'></div>)
              : 
              null
            }
              </div>
            )
          }
          </>))}
          <p>{errorMessage}</p>
          <button type="submit" className={submitClass}>{submitButton}</button>    
    </form>
  )
}

export default FormR