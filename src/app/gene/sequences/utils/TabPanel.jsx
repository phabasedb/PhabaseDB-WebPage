// third party
import { Box } from "@mui/material";

export default function TabPanel({ children, value, index }) {
  const isActive = value === index;

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      id={`sequence-tabpanel-${index}`}
      aria-labelledby={`sequence-tab-${index}`}
    >
      {isActive && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#D9D9D9",
            my: 1,
          }}
        >
          <Box sx={{ width: "95%", my: 2, background: "white" }}>
            {children}
          </Box>
        </Box>
      )}
    </div>
  );
}
