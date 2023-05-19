import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthHandler from "../features/auth/AuthHandler";
import router from "./router";
import store from "./store";

const App = () => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <AuthHandler>
          <RouterProvider router={router} />
        </AuthHandler>
        <ToastContainer position="bottom-right" />
      </Provider>
    </CookiesProvider>
  );
};

export default App;
