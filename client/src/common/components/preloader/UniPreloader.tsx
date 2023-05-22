import { ReactNode, useEffect } from "react";

const UniPreloader = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  }, []);

  return <>{children}</>;
};

export default UniPreloader;
