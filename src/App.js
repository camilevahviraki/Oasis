import './App.css';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './redux/store';
import MainRouter from './router/MainRouter';
import i18n from './config/i18n';
import './styles/rtl.css';
// import "leaflet/dist/leaflet.css";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <div className="App">
          <MainRouter />
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
