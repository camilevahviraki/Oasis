import "./App.css";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import CreateStore from "./seller/stores/CreateStore/CreateStore";
import MainRouter from "./router/MainRouter";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainRouter/>
      </div>
    </Provider>
  );
}

export default App;
