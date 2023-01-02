import React from 'react'

const FormR = (props) => {

  const {
    classForm,
    inputsArray,
    submitFunction,
    submitButton,
    submitClass,
  } = props;
    
  return (
    <form className={classForm} onSubmit={submitFunction}>
        {inputsArray.map((inputObj) => (<>
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
              <input
              type={inputObj.type}
              name={inputObj.name}
              className={inputObj.classInput? inputObj.classInput : 'input'}
              placeholder={inputObj.placeholder}
              />
            )
          }
          </>))}
          <button type="submit" className={submitClass}>{submitButton}</button>    
    </form>
  )
}

export default FormR