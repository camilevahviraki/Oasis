import React from 'react';
import loader from '../../images/loader.png';
import { FiLoader} from 'react-icons/fi';
import './Loader.css';

const Loader = () => (
  <div className="Loader-container">
    {/* <img src={loader} alt="" className="Loader" /> */}
    <FiLoader className='Loader'/>
  </div>
);

export default Loader;
