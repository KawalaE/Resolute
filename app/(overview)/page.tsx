import { Metadata } from "next";
import Board from "../Board";

function Home() {
  return <Board />;
}
export default Home;

export const metadata: Metadata = {
  title: "Resolute - Dashboard",
  description: `Track and manage issues efficiently with a dynamic issue board 
    that categorizes tasks by status, displays assigned team members,
     and highlights priority levels for easy identification.`,

  //add open graph and twitter properties
};
