"use client";

// standard

// third party
import { useParams } from "next/navigation";

// local
import SearchGene from "@/components/SearchGene";
import Title from "../Title";
import DataTable from "../DataTable";

export default function Search() {
  const { searchTerm } = useParams();
  return (
    <>
      <Title />
      <SearchGene />
      <DataTable searchTerm={searchTerm} />
    </>
  );
}
