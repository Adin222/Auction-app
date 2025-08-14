import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  );
};
