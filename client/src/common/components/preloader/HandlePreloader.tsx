import { useEffect } from "react";

const HandlePreloader = () => {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  }, []);

  return null;
};

export default HandlePreloader;
