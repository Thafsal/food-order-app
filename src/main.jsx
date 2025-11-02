import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./contexts/ThemeContext";
import StoreContextProvider from "./contexts/StoreContext";
import { Provider } from "react-redux";
import store from "./features/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
