import useUsers from "./useUsers";

const useUser = (id?: string) => {
  const { data: users } = useUsers();
  const findUser = users?.find((user) => user.id === id);
  return findUser;
};

export default useUser;
