// standard

// third party

// local
import Title from "./Title";
import CardIndex from "./Card";
import SearchHistory from "./SearchHistory";
import SearchGene from "@/components/SearchGene";

export default function Home() {
  return (
    <>
      <Title />
      <SearchGene />
      <SearchHistory />
      <CardIndex />
    </>
  );
}
