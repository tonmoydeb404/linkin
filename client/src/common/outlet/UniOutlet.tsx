import { Outlet } from "react-router-dom";
import UniPreloader from "../components/preloader/UniPreloader";

const UniOutlet = () => {
  return (
    <UniPreloader>
      <Outlet />
    </UniPreloader>
  );
};

export default UniOutlet;
