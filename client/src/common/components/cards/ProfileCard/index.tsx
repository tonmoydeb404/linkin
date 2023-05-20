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
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.avatar}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-[160px] h-[160px] aspect-square rounded-full mb-5"
        />

        <h1 className="text-3xl font-bold mb-1">
          {profile.firstName} {profile.lastName}
        </h1>

        <h2 className="text-base font-medium opacity-90">
          @{profile.user.username}
        </h2>

        <p className="text-center mt-5 max-w-md">{profile.bio}</p>
      </div>
      <ProfileSocials />
    </div>
  );
};

export default ProfileCard;
