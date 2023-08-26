import { HiBadgeCheck } from "react-icons/hi";
import { IProfile } from "../../../../types/profile.type";
import { IUser } from "../../../../types/user.type";
import ProfileSocials from "./ProfileSocials";

type Props = {
  profile: IProfile<IUser>;
  className?: string;
};
const ProfileCard = ({ profile, className = "" }: Props) => {
  return (
    <div className={className}>
      <div className="profile_card_info">
        <img
          src={profile.avatar}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="profile_card_avatar"
        />

        <div className="relative">
          <h1 className="profile_card_title">
            {profile.firstName} {profile.lastName}
          </h1>
          <span className="profile_card_verified">
            {profile.user.verifiedStatus === "DEVELOPER" ? (
              <HiBadgeCheck
                className={`developer`}
                title="Verified as a developer"
              />
            ) : null}
            {profile.user.verifiedStatus === "CELEBRITY" ? (
              <HiBadgeCheck
                className={`celebrity`}
                title="Verified as a celebrity"
              />
            ) : null}
          </span>
        </div>

        <h2 className="profile_card_subtitle">@{profile.user.username}</h2>

        <p className="profile_card_bio">{profile.bio}</p>
      </div>
      {profile?.socials ? <ProfileSocials socials={profile.socials} /> : null}
    </div>
  );
};

export default ProfileCard;
