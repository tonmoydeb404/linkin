import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
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
      </Provider>
    </CookiesProvider>
  );
};

export default App;
