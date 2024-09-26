import { SymbolIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

const ResetFilters = () => {
  return (
    <Button>
      <Link href="/issues">
        <Flex align="center" gap="1rem">
          {"Reset filters"}
          <SymbolIcon />
        </Flex>
      </Link>
    </Button>
  );
};

export default ResetFilters;
