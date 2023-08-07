import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetLinkQuery } from "../api/linkApi";
import PagePreloader from "../common/components/preloader/PagePreloader";
import NotFound from "./errors/NotFound";

const ShortLink = () => {
  const { slug } = useParams();
  const [getLink, link] = useLazyGetLinkQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const data = await getLink(slug).unwrap();
        window.location.assign(data.results.url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (
    !slug ||
    (link.isError && "status" in link.error && link.error.status === 404)
  )
    return <NotFound />;

  return <PagePreloader />;
};

export default ShortLink;
