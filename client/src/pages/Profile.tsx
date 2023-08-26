import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useLazyGetProfileQuery } from "../api/profileApi";
import LinkCard from "../common/components/cards/LinkCard";
import ProfileCard from "../common/components/cards/ProfileCard";
import PagePreloader from "../common/components/preloader/PagePreloader";
import Banned from "./errors/Banned";
import ErrorPage from "./errors/ErrorPage";
import NotFound from "./errors/NotFound";

const Profile = () => {
  const { username } = useParams();
  const [getProfile, profile] = useLazyGetProfileQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) throw new Error("username not defined");
        const response = await getProfile(username).unwrap();

        document.documentElement.classList.add(
          response.result.layout?.defaultTheme || ""
        );
        document.documentElement.dataset.style = response.result.layout?.style;
        document.documentElement.setAttribute(
          "style",
          `--user-color: ${response.result.layout?.color || ""}`
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (profile.isError && "data" in profile.error) {
    if (profile.error.data.statusCode === 404) {
      return <NotFound />;
    } else if (profile.error.data.statusCode === 410) {
      return <Banned />;
    } else {
      return <ErrorPage />;
    }
  }

  if (profile.isSuccess) {
    return (
      <>
        <Helmet>
          <title>
            {profile.data.result.firstName} {profile.data.result.lastName} -
            LinkIn
          </title>
        </Helmet>
        <main className="w-full min-h-screen bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
          <div className="max-w-lg mx-auto px-3 sm:px-0 py-16">
            <ProfileCard profile={profile.data.result} className="mb-10" />
            {profile.data.result.links ? (
              <div className="flex flex-col gap-2 mb-10">
                {profile.data.result.links.map((link) => (
                  <LinkCard link={link} key={link._id} />
                ))}
              </div>
            ) : null}
          </div>
        </main>
      </>
    );
  }

  return <PagePreloader />;
};

export default Profile;
