import { SymbolIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

export interface Reset {
  reset: boolean;
  resetHandler: (value: boolean) => void;
}

const ResetFilters = ({ reset, resetHandler }: Reset) => {
  return (
    <Button onClick={() => resetHandler(true)}>
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
