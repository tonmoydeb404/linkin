import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetLinkQuery } from "../api/linkApi";
import PagePreloader from "../common/components/preloader/PagePreloader";
import Banned from "./errors/Banned";
import ErrorPage from "./errors/ErrorPage";
import NotFound from "./errors/NotFound";

const ShortLink = () => {
  const { slug } = useParams();
  const [getLink, link] = useLazyGetLinkQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const data = await getLink(slug).unwrap();
        window.location.assign(data.result.url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // handle errors
  if (link.isError && "data" in link.error) {
    if (link.error.data.statusCode === 404) {
      return <NotFound />;
    } else if (link.error.data.statusCode === 410) {
      return <Banned />;
    } else {
      return <ErrorPage />;
    }
  }

  return <PagePreloader />;
};

export default ShortLink;
