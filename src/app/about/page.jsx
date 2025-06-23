//standard

// third party
import { Box } from "@mui/material";

//local
import InformationSection from "./struct-info";
import TeamSection from "./struct-team";
import CollaborationsSection from "./struct-collabs";
import { about } from "@/static/text/us-US/about";

//Page divided into 3 sections: Information, team, and collaborators.
export default function AboutUs() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: { xs: 3, md: 4 },
      }}
    >
      <InformationSection information={about.information} />
      <TeamSection members={about.members} />
      <CollaborationsSection collaborations={about.collaborations} />
    </Box>
  );
}
