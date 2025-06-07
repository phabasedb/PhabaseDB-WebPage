import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export function BlastResults({ xmlJson }) {
  const iterations = xmlJson?.BlastOutput?.BlastOutput_iterations?.Iteration;
  // extrae todos los <Hit>
  const rawHits = Array.isArray(iterations)
    ? iterations.flatMap((it) => it.Iteration_hits?.Hit || [])
    : iterations?.Iteration_hits?.Hit
    ? [iterations.Iteration_hits.Hit]
    : [];
  if (!rawHits.length) {
    return <Typography>No se encontraron hits.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ width: "90%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rawHits.map((hit, i) => {
            const score = Array.isArray(hit.Hit_hsps?.Hsp)
              ? hit.Hit_hsps.Hsp[0].Hsp_score
              : hit.Hit_hsps?.Hsp?.Hsp_score;
            return (
              <TableRow key={i}>
                <TableCell>{hit.Hit_id}</TableCell>
                <TableCell>{hit.Hit_def}</TableCell>
                <TableCell>{score}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
