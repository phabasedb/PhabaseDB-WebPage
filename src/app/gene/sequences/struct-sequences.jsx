// standard
import { useState } from "react";

// third party
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";

//local
import SequencesHeader from "./components/SequencesHeader";
import TabPanel from "./utils/TabPanel";
import { SEQUENCE_TABS } from "./utils/sequenceTabs.config";
import { downloadFasta } from "./utils/downloadFasta";

export default function StructSequences({
  gene,
  chromosome,
  selectedTranscript,
}) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Tabs state
  const [tabValue, setTabValue] = useState("genomic");
  const activeTab = SEQUENCE_TABS.find((tab) => tab.value === tabValue);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const handleDownload = () => {
    if (!activeTab?.buildFasta) return;

    const fastaContent = activeTab.buildFasta({
      gene,
      chromosome,
      selectedTranscript,
    });

    if (!fastaContent) return;

    downloadFasta({
      content: fastaContent,
      filename: `${tabValue}.fasta`,
    });
  };

  return (
    <Box
      sx={{
        width: "90%",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 5,
        overflow: "hidden",
        py: 2,
      }}
    >
      <SequencesHeader onDownload={handleDownload} />

      {/* TABS */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 1,
        }}
      >
        <Box sx={{ width: "90%" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            orientation={isMdUp ? "horizontal" : "vertical"}
            aria-label="Sequence Tabs"
          >
            {SEQUENCE_TABS.map((tab) => {
              if (tab.requiresTranscript && !selectedTranscript) return null;

              const length =
                tab.getLength({
                  gene,
                  selectedTranscript,
                }) ?? "N/A";

              return (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={tab.label(length)}
                  sx={{ maxWidth: "unset" }}
                />
              );
            })}
          </Tabs>

          {SEQUENCE_TABS.map((tab) => {
            if (tab.requiresTranscript && !selectedTranscript) return null;

            return (
              <TabPanel key={tab.value} value={tabValue} index={tab.value}>
                {tab.render({
                  gene,
                  chromosome,
                  selectedTranscript,
                })}
              </TabPanel>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
