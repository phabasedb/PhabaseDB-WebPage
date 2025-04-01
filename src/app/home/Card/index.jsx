// standard

// third party
import { Box } from "@mui/material";

// local
import StructInfoCardHome from "./StructInfoCardHome";
import { home } from "@/static/text/us-US";

export default function Card() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        my: 8,
      }}
    >
      {home.map((item, index) => (
        <StructInfoCardHome key={index} item={item} index={index} />
      ))}
    </Box>
  );
}
