"use client";

// standard

// third party
import { useParams } from "next/navigation";

// local
import Title from "../title";
import DataTable from "../datatable";
import SearchGene from "@/components/SearchGene";

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
