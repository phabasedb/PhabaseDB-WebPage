// standard

// third party
import { Box } from "@mui/material";

// local
import StructCard from "./struct-card";
import { home } from "@/static/text/us-US/home";

export default function InformationCard() {
  return (
    <Box>
      <Box
        sx={{
          my: { xs: 3, md: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {home.map((item, index) => (
          <StructCard key={index} item={item} index={index} />
        ))}
      </Box>
    </Box>
  );
}
