// third party
import { Typography } from "@mui/material";

export default function SequenceRenderer({ segments }) {
  return (
    <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
      {segments.map((seg, i) =>
        seg.color ? (
          <span key={i} style={{ backgroundColor: seg.color }}>
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </Typography>
  );
}
