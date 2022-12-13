import React from 'react'

function CreateStore() {
  return (
    <div className='form'>
      <form>
        <input type='text' name='store-name' placeholder=''/>
        <input type='text' name='city' placeholder=''/>
        <textarea name='description' placeholder='description'></textarea>
        <input type='file' name='pictures' multiple />

      </form>

    </div>
  )
}

export default CreateStore