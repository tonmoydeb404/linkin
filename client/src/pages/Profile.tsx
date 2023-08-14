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
      if (username) {
        await getProfile(username);
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
            {profile.data.results.firstName} {profile.data.results.lastName} -
            LinkIn
          </title>
        </Helmet>
        <div className="w-full min-h-screen bg-slate-200 text-slate-800">
          <div className="max-w-lg mx-auto px-3 sm:px-0 py-16">
            <ProfileCard profile={profile.data.results} className="mb-10" />
            {profile.data.results.links ? (
              <div className="flex flex-col gap-2 mb-10">
                {profile.data.results.links.map((link) => (
                  <LinkCard link={link} key={link._id} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  return <PagePreloader />;
};

export default Profile;
