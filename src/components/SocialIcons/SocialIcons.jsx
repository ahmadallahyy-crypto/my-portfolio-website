import React from "react";
import "./SocialIcons.css";
import {
  FaGithub,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaYoutube,
  FaTwitch,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
  FaCircle
} from "react-icons/fa";
import { socialprofils } from "../../data/content.jsx";

const ICON_MAPPING = {
  default: FaCircle,
  facebook: FaFacebookF,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  snapchat: FaSnapchatGhost,
  tiktok: FaTiktok,
  twitter: FaTwitter,
  twitch: FaTwitch,
  youtube: FaYoutube
};

export const Socialicons = (params) => {
  // Filter out any invalid URLs for better error handling
  const validProfiles = Object.entries(socialprofils).filter(
    ([, url]) => url && typeof url === 'string' && url !== '#'
  );

  // Don't render anything if no valid social profiles exist
  if (validProfiles.length === 0) {
    return null;
  }

  return (
    <div className="stick_follow_icon">
      <ul>
        {validProfiles.map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          
          return (
            <li key={platform}>
              <a 
                href={url}
                target="_blank"           // Opens in new tab (better UX)
                rel="noopener noreferrer"  // Security: prevents tab hijacking
                aria-label={`Follow me on ${platform}`}  // Accessibility
                title={`Visit my ${platform} profile`}   // Tooltip on hover
              >
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>Follow Me</p>
    </div>
  );
};

// Optional: Add default export for convenience
export default Socialicons;