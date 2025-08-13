import { Box, Typography } from "@mui/material";

export const LocationRibbon = ({ location, category, subCategory }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7",
        height: "64px",
        display: "flex",
        alignItems: "center",
        px: 3,
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ textTransform: "uppercase", color: "#616161" }}>
        {location.toUpperCase()}
      </Typography>
      <Typography sx={{ textTransform: "uppercase", color: "grey" }}>
        {category.toUpperCase()}
        {subCategory ? ` / ${subCategory.toUpperCase()}` : ""}
      </Typography>
    </Box>
  );
};
