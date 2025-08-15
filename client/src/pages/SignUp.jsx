import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastMessage } from "../components/ToastMessage";

import { post } from "../services/services";

import { registerRoute } from "../routes/routes";

export const SignUp = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "seller",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (value.trim() !== "") {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: formData.firstName.trim() === "",
      lastName: formData.lastName.trim() === "",
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setLoading(true);

    const response = await post(registerRoute, formData);

    if (response.status === 200) {
      setToastMessage({
        open: true,
        message: response.data.message,
        status: "success",
      });
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, [2000]);
    } else {
      setToastMessage({
        open: true,
        message: response.data.error,
        status: "error",
      });
    }
  };

  return (
    <React.Fragment>
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
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={4}>
          REGISTER
        </Typography>

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          onSubmit={handleSubmit}
        >
          <TextField
            label="First Name"
            placeholder="John"
            fullWidth
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={errors.firstName}
            helperText={errors.firstName ? "First name is required" : ""}
          />
          <TextField
            label="Last Name"
            placeholder="Doe"
            fullWidth
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={errors.lastName}
            helperText={errors.lastName ? "Last name is required" : ""}
          />
          <TextField
            label="Enter Email"
            type="email"
            placeholder="user@domain.com"
            fullWidth
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
            disabled={loading}
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
            REGISTER
          </Button>
        </Box>

        <Typography variant="body2" mt={3}>
          Already have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/login")}
            sx={{ textDecoration: "none", color: "#7c4dff" }}
          >
            Login
          </Link>
        </Typography>
      </Box>
      <ToastMessage
        data={toastMessage}
        handleClose={() => setToastMessage(false)}
      />
    </React.Fragment>
  );
};
