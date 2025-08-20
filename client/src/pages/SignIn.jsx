import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useUserState from "../hooks/useUserState";
import { Container } from "@mui/material";

import { post } from "../services/services";

import { loginRoute } from "../routes/routes";
import { ToastMessage } from "../components/ToastMessage";

export const SignIn = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });
  const navigate = useNavigate();

  const { refetch } = useUserState();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (value.trim() !== "") {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setLoading(true);
    const response = await post(loginRoute, formData);
    console.log(response);
    if (response.status === 200) {
      setToastMessage({
        open: true,
        message: response.data.message,
        status: "success",
      });
      setTimeout(() => {
        refetch();
        navigate("/");
        setLoading(false);
      }, [750]);
    } else {
      setLoading(false);
      setToastMessage({
        open: true,
        message: response.data.error,
        status: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            maxWidth: 450,
            width: "90%",
            mx: "auto",
            p: 6,
            border: "1px solid #eee",
            borderRadius: 3,
            bgcolor: "#fff",
            textAlign: "center",
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={4}>
            LOGIN
          </Typography>

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Email"
              type="email"
              placeholder="user@domain.com"
              fullWidth
              size="medium"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              helperText={errors.email ? "Email is required" : ""}
            />

            <TextField
              label="Password"
              type={togglePassword ? "text" : "password"}
              placeholder="********"
              fullWidth
              size="medium"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
              helperText={errors.password ? "Password is required" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setTogglePassword(!togglePassword)}
                      edge="end"
                    >
                      {!togglePassword ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              loading={loading}
              disable={loading}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#7c4dff",
                "&:hover": { bgcolor: "#6a3ce8" },
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              LOGIN
            </Button>
          </Box>

          <Typography variant="body2" mt={3}>
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/register")}
              sx={{ textDecoration: "none", color: "#7c4dff" }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Container>

      <ToastMessage
        data={toastMessage}
        handleClose={() => setToastMessage(false)}
      />
    </React.Fragment>
  );
};
