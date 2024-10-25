import { Metadata } from "next";
import Board from "../_components/Board";

function Home() {
  return <Board />;
}
export default Home;

export const metadata: Metadata = {
  title: "Resolute - Dashboard",
  description: `Track and manage issues efficiently with a dynamic issue board 
    that categorizes tasks by status, displays assigned team members,
     and highlights priority levels for easy identification.`,
  openGraph: {
    title: "Resolute - Dashboard",
    description: `Track and manage issues efficiently with a dynamic issue board.`,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Resolute Issue Details",
      },
    ],
  },
};
