import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
  href: string;
  label: string;
}

const Link = ({ href, label }: Props) => {
  return (
    <NextLink href={href} legacyBehavior>
      <RadixLink color="gray" weight="medium">
        {label}
      </RadixLink>
    </NextLink>
  );
};

export default Link;
