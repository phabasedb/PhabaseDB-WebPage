"use client";

// standard

// third party
import { useParams } from "next/navigation";

// local
import Title from "../title";
import DataTable from "../datatable";
import SearchGene from "@/components/SearchGene";

// Retrieves the term parameter from the URL and passes it to DataTable
export default function Search() {
  const { term } = useParams();
  return (
    <>
      <Title />
      <SearchGene />
      <DataTable term={term} />
    </>
  );
}
