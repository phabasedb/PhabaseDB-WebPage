// standard

// third party

// local
import Title from "./titlee";
import InformationCard from "./cardd";
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
