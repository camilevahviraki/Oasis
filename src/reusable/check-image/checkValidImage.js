import React, {useState} from 'react';
import axios from 'axios';

const CheckValidImage = (props) => {

  const {
    avartarUrl,
    defaultImg,
  } = props;

  const [imageUrl, setImageUrl] = useState(defaultImg);

  axios.get(avartarUrl)
  .then((response) => {
    if(response.status === 404) {
        setImageUrl(defaultImg);
      } else {
        setImageUrl(avartarUrl)
      }
  })
  .catch((err) => {
      setImageUrl(defaultImg);
  })

  return imageUrl;
}

export default CheckValidImage