import "./App.css";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import CreateStore from "./seller/stores/CreateStore/CreateStore";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CreateStore />
      </div>
    </Provider>
  );
}

export default App;
