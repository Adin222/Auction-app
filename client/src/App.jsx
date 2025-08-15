import { useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { parseLocation } from "./utils/utils";
import Box from "@mui/material/Box";
import { StateContext } from "./context/StateContext";
import "./App.css";
import { ScrollToTop } from "./components/ScrollToTop";

import { useQuery } from "@tanstack/react-query";

import { get, post } from "./services/services";
import { meRoute, logoutRoute } from "./routes/routes";
import { Loading } from "./components/Loading";
import { ModalWindow } from "./components/ModalWindow";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["logged_user"],
    queryFn: () => get(meRoute),
    retry: false,
  });

  const hanldeLogout = async () => {
    const response = await post(logoutRoute, {});
    setLoading(true);
    if (response.status === 200) {
      refetch();
      navigate("/");
      setLoading(false);
      setOpen(false);
    } else {
      setLoading(false);
      alert("ERRORRR");
    }
  };

  if (isLoading) return <Loading />;

  const { role } = data?.data;

  const value = {
    role,
    refetch,
    setOpen,
  };

  return (
    <StateContext value={value}>
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
        <ScrollToTop />
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
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Footer />}
      </Box>
      <ModalWindow
        open={open}
        setOpen={setOpen}
        text="Are you sure you want to log out of your account?"
        handleFunction={hanldeLogout}
        loading={loading}
      />
    </StateContext>
  );
}

export default App;
