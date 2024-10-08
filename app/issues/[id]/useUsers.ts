import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, //24h
    retry: 3,
  });
};

export default useUsers;
