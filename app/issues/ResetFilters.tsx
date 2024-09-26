import { SymbolIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const ResetFilters = () => {
  return (
    <Button>
      <Link href="/issues">
        <SymbolIcon />
      </Link>
    </Button>
  );
};

export default ResetFilters;
