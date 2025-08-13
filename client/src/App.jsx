import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BecomeSeller } from "./pages/BecomeSeller";
import { Routes, Route } from "react-router-dom";
import { ActionNavbar } from "./components/ActionNavbar";
import { LoginNavbar } from "./components/LoginNavbar";
import { LocationRibbon } from "./components/LocationRibbon";
import { CssBaseline, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { parseLocation } from "./utils/utils";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box>
        <ActionNavbar />
        {(location.pathname === "/login" ||
          location.pathname === "/register") && <LoginNavbar />}
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Navbar />}
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <LocationRibbon
              location={parseLocation(location.pathname).second}
              category={parseLocation(location.pathname).first}
              subCategory={parseLocation(location.pathname).second}
            />
          )}
      </Box>

      <CssBaseline />
      <Box sx={{ flex: 1, mt: 4, mb: 4 }}>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/my-account/become-seller"
              element={<BecomeSeller />}
            />
          </Routes>
        </Container>
      </Box>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Footer />
      )}
    </Box>
  );
}

export default App;
