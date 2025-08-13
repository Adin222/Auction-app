import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GavelIcon from "@mui/icons-material/Gavel";

export const LoginNavbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #d1d1d1",
        height: "80px",
        justifyContent: "center",
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <GavelIcon sx={{ color: "#616161", fontSize: "32px" }} />
          <Typography
            variant="h6"
            sx={{ color: "#616161", fontWeight: 500, fontSize: "24px" }}
          >
            Auction
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
