"use client";

// standard

// third party
import { useParams } from "next/navigation";

// local
import Title from "../titlee";
import DataTable from "../datatablee";
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
