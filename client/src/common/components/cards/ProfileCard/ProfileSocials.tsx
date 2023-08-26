import SocialIcon from "../../../../config/SocialIcon";
import { ISocial } from "../../../../types/social.type";

type Props = {
  socials: ISocial[];
};
const ProfileSocials = ({ socials = [] }: Props) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      {socials.map((social) => {
        const Icon = SocialIcon[social.site];
        return (
          <a
            key={social._id}
            href={social.url}
            target="_blank"
            className="p-2 hover:bg-black/10 dark:hover:bg-gray-100/5 inline-block rounded-full duration-200 text-[28px]"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default ProfileSocials;
