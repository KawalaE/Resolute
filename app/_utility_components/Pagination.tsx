"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    const query = "?" + params.toString();
    router.push(query);
  };

  return (
    <Flex align="center" gap="2">
      <Text className="hidden sm:table-cell">
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        aria-label="double-left"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(1);
        }}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        aria-label="left"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        aria-label="right"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowRightIcon />
      </Button>
      <Button
        aria-label="double-right"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
