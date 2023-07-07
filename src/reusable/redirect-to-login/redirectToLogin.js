import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const RedirectToLogin = () => {
  const userData = useSelector((state) => state.authenticationReducer);
  const { token } = userData;
  if (token) {
    return false;
  }
  return true;
};

export default RedirectToLogin;
