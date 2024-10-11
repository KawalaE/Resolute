import { Link as RadixLink, Text } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
  href: string;
  label: string;
}

const Link = ({ href, label }: Props) => {
  return (
    <Text className="cursor-pointer">
      <NextLink href={href} legacyBehavior>
        <RadixLink color="gray" weight="medium">
          {label}
        </RadixLink>
      </NextLink>
    </Text>
  );
};

export default Link;
