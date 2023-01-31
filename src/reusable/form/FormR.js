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
  } = props;
    
  return (
    <form className={classForm} onSubmit={submitFunction}>
        {inputsArray.map((inputObj, key) => (<>
          {
            inputObj.type === 'textarea'?
            (
              <textarea
                name={inputObj.name}
                className={inputObj.classInput? inputObj.classInput : 'textarea'}
                placeholder={inputObj.placeholder}
              >
              </textarea>
            ):
            (
              <div className='formR-input-wrap'>
              <input
              type={inputObj.type}
              name={inputObj.name}
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