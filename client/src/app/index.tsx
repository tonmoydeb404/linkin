import HandlePreloader from "@/common/components/preloader/HandlePreloader";
import ThemeHandler from "@/features/theme/ThemeHandler";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthHandler from "../features/auth/AuthHandler";
import router from "./router";
import store from "./store";

const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ThemeHandler />
        <AuthHandler>
          <RouterProvider router={router} />
        </AuthHandler>
        <ToastContainer position="bottom-right" />
        <HandlePreloader />
      </Provider>
    </HelmetProvider>
  );
};

export default App;
