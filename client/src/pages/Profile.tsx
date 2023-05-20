import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useLazyGetProfileQuery } from "../api/profileApi";
import LinkCard from "../common/components/cards/LinkCard";
import ProfileCard from "../common/components/cards/ProfileCard";
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

  if (
    !username ||
    (profile.isError &&
      "data" in profile.error &&
      profile.error.data.statusCode === 404)
  ) {
    return <NotFound />;
  }

  if (profile.isSuccess) {
    return (
      <>
        <Helmet>
          <title>Profile - LinkIn</title>
        </Helmet>
        <div className="w-full min-h-screen bg-slate-200 text-slate-800">
          <div className="max-w-lg mx-auto py-16">
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

  return <div>loading...</div>;
};

export default Profile;
