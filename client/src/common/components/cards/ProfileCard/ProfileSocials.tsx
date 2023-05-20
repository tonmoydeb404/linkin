import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ProfileSocials = () => {
  return (
    <div className="flex items-center justify-center flex-wrap text-2xl gap-2">
      <a
        href="#"
        target="_blank"
        className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
      >
        <FaFacebook />
      </a>
      <a
        href="#"
        target="_blank"
        className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
      >
        <FaTwitter />
      </a>
      <a
        href="#"
        target="_blank"
        className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
      >
        <FaInstagram />
      </a>
      <a
        href="#"
        target="_blank"
        className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default ProfileSocials;
