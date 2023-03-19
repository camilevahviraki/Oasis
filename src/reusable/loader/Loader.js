import React from 'react';
import loader from '../../images/loader.png';
import './Loader.css';

const Loader = () => (
  <div className="Loader-container">
    <img src={loader} alt="" className="Loader" />
  </div>
);

export default Loader;
