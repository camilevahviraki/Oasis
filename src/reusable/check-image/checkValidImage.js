import React, { useState, Component } from 'react';
import axios from 'axios';
import defaultImg from '../../images/item-splash-image.png';

const CheckValidImage = (props) => {
  const [imageUrl, setImageUrl] = useState(defaultImg);
  const { avartarUrl } = props;

  axios
    .get(avartarUrl)
    .then((response) => {
      if (response.status === 404) {
        setImageUrl(defaultImg);
      } else {
        setImageUrl(avartarUrl);
      }
    })
    .catch(() => {
      setImageUrl(defaultImg);
    });

  return imageUrl;
};

export default CheckValidImage;
