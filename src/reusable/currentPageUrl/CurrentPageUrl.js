import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentLink } from '../../redux/authentication/reusableAuthReducer';

const CheckLogin = (props) => {
  const [currentPath, setCurrentPath] = useState(null);
  const { path } = props;
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  const userData = useSelector((state) => state.authenticationReducer);
  const { token } = userData;

  if (token) {
    return path;
  }
  return `../${currentPath}`;
};

export default CheckLogin;
