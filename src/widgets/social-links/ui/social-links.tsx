import { HStack, Icon, Link } from "@chakra-ui/react";
import { ReactElement } from "react";
import { SiYoutube, SiTelegram, SiInstagram } from "react-icons/si";

export type SocialLink = { href: string; icon: ReactElement };

const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/liz.a.shi",
    icon: <SiInstagram />,
  },
  {
    href: "https://www.youtube.com/@shiretec",
    icon: <SiYoutube />,
  },
  {
    href: "https://www.t.me/shiretec",
    icon: <SiTelegram />,
  },
];

export const SocialLinks: React.FC = (props) => {
  return (
    <HStack gap={4} justify="center" {...props}>
      {socialLinks.map(({ href, icon }) => (
        <Link key={href} href={href}>
          <Icon size="lg">{icon}</Icon>
        </Link>
      ))}
    </HStack>
  );
};
