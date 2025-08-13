import { Box, Container, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const ActionNavbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#363636ff",
        height: "32px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="/login"
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "0.85rem",
              minWidth: "auto",
              padding: "0 8px",
            }}
          >
            Login
          </Button>
          <Typography sx={{ color: "#bdbdbd" }}>or</Typography>
          <Button
            component={Link}
            to="/register"
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "0.85rem",
              minWidth: "auto",
              padding: "0 8px",
            }}
          >
            Create an Account
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
