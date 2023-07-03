import './App.css';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import MainRouter from './router/MainRouter';
// import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainRouter />
      </div>
    </Provider>
  );
}

export default App;
