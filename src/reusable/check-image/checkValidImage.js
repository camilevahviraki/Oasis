import React, { useState, Component } from 'react';
import axios from 'axios';
// import defaultImg from '../../images/item-splash-image.png';

const CheckValidImage = (props) => {
  const { avartarUrl, defaultImg } = props;
  const [imageUrl, setImageUrl] = useState(defaultImg);

  // if(avartarUrl){
  //   axios
  //   .get(avartarUrl)
  //   .then((response) => {
  //     if (response.status === 404) {
  //       setImageUrl(defaultImg);
  //     } else {
  //       setImageUrl(avartarUrl);
  //     }
  //   })
  //   .catch(() => {
  //     setImageUrl(defaultImg);
  //   });
  // }else {
  //   setImageUrl(defaultImg);
  // }

  if(avartarUrl){
    return avartarUrl;
  }else {
    return defaultImg;
  }
};

export default CheckValidImage;
