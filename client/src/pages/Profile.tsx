import { contentColor, primaryColor } from "@/config/defaultColors";
import { ILayout } from "@/types/layout.type";
import setDocTheme from "@/utils/setDocTheme";
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

const updateLayout = (layout?: ILayout | null) => {
  const root = document.documentElement;

  // update theme
  setDocTheme(layout?.theme || "SYSTEM");

  // update colors

  root.style.setProperty(
    "--primaryColor",
    layout?.primaryColor || primaryColor
  );

  root.style.setProperty(
    "--contentColor",
    layout?.contentColor || contentColor
  );

  // update shape style
  root.dataset.style = layout?.style;
};

const Profile = () => {
  const { username } = useParams();
  const [getProfile, profile] = useLazyGetProfileQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) throw new Error("username not defined");
        const res = await getProfile(username).unwrap();
        // update theme according to user layout preference
        updateLayout(res.result.layout);
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
    const layout = profile.data.result.layout;
    return (
      <>
        <Helmet>
          <title>
            {profile.data.result.firstName} {profile.data.result.lastName} -
            LinkIn
          </title>
          {layout?.primaryColor ? (
            <meta name="theme-color" content={layout.primaryColor} />
          ) : null}
        </Helmet>
        <main className="profile">
          <div className="profile_container">
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
