const CheckValidImage = (props) => {
  const { avartarUrl, defaultImg } = props;

  if (avartarUrl) {
    return avartarUrl;
  }
  return defaultImg;
};

export default CheckValidImage;
