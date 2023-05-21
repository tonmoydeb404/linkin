import { IconType } from "react-icons";
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaStackOverflow,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import socialSites from "../data/social-sites";

const SocialIcon: Record<(typeof socialSites)[number], IconType> = {
  FACEBOOK: FaFacebook,
  BEHANCE: FaBehance,
  DRIBBLE: FaDribbble,
  INSTAGRAM: FaInstagram,
  GITHUB: FaGithub,
  LINKEDIN: FaLinkedin,
  STACKOVERFLOW: FaStackOverflow,
  WHATSAPP: FaWhatsapp,
  YOUTUBE: FaYoutube,
};

export default SocialIcon;
