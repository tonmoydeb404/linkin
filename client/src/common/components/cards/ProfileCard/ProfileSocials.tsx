import SocialIcon from "../../../../config/SocialIcon";
import { ISocial } from "../../../../types/social.type";

type Props = {
  socials: ISocial[];
};
const ProfileSocials = ({ socials = [] }: Props) => {
  return (
    <div className="profile_card_socials">
      {socials.map((social) => {
        const Icon = SocialIcon[social.site];
        return (
          <a
            key={social._id}
            href={social.url}
            target="_blank"
            className="profile_card_social"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default ProfileSocials;
