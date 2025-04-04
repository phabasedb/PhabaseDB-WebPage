"use client";

// standard

// third party
import { useParams } from "next/navigation";

// local
import Title from "../Title";
import SearchGene from "@/components/SearchGene";
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
