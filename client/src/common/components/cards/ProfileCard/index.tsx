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
      <div className="flex flex-col items-center mb-8 text-center">
        <img
          src={profile.avatar}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-[160px] h-[160px] aspect-square rounded-full mb-5"
        />

        <div className="relative">
          <h1 className="text-3xl font-bold mb-1">
            {profile.firstName} {profile.lastName}
          </h1>
          <span className="absolute -right-7 top-1/2 -translate-y-1/2">
            {profile.user.verifiedStatus === "DEVELOPER" ? (
              <HiBadgeCheck
                className={`text-2xl  text-primary`}
                title="Verified as a developer"
              />
            ) : null}
            {profile.user.verifiedStatus === "CELEBRITY" ? (
              <HiBadgeCheck
                className={`text-2xl text-blue-600`}
                title="Verified as a celebrity"
              />
            ) : null}
          </span>
        </div>

        <h2 className="text-base font-medium text-gray-600 dark:text-gray-400">
          @{profile.user.username}
        </h2>

        <p className="mt-5 max-w-md">{profile.bio}</p>
      </div>
      {profile?.socials ? <ProfileSocials socials={profile.socials} /> : null}
    </div>
  );
};

export default ProfileCard;
