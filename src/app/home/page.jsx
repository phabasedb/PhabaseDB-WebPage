// standard

// third party

// local
import Title from "./title";
import InformationCard from "./card";
import SearchHistory from "./history";
import SearchGene from "@/components/SearchGene";

export default function Home() {
  return (
    <>
      <Title />
      <SearchGene />
      <SearchHistory />
      <InformationCard />
    </>
  );
}
