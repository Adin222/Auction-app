import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const SecondStep = ({ setStep, handleAuction, body, saveToLocal }) => {
  const [error, setError] = useState("");

  const validateAndNext = async () => {
    if (!body.startPrice || !body.startDate || !body.endDate) {
      setError("Please fill all fields.");
      return;
    }
    if (new Date(body.endDate) <= new Date(body.startDate)) {
      setError("End date must be after start date.");
      return;
    }
    setError("");
    await saveToLocal(body);
    setStep(3);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{ maxWidth: 500, mx: "auto", mt: 5, border: "1px solid #e0e0e0" }}
      >
        <Box sx={{ backgroundColor: "#fafafa", p: 2 }}>
          <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
            SET PRICES
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography>Your start Price</Typography>
          <TextField
            fullWidth
            value={body.startPrice}
            name="startPrice"
            onChange={handleAuction}
            placeholder="price"
            sx={{ mt: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <DatePicker
              label="Start date"
              value={body.startDate ? new Date(body.startDate) : null}
              disablePast
              onChange={(newValue) =>
                handleAuction({
                  target: { name: "startDate", value: newValue },
                })
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            <DatePicker
              label="End date"
              value={body.endDate ? new Date(body.endDate) : null}
              disablePast
              onChange={(newValue) =>
                handleAuction({ target: { name: "endDate", value: newValue } })
              }
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            The auction will be automatically closed when the end time comes.
            The highest bid will win the auction.
          </Typography>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => setStep(1)}
              sx={{
                px: 3,
                borderColor: "purple",
                color: "purple",
                "&:hover": { borderColor: "purple" },
              }}
            >
              BACK
            </Button>
            <Button
              onClick={validateAndNext}
              variant="outlined"
              sx={{
                px: 3,
                borderColor: "purple",
                color: "white",
                backgroundColor: "purple",
                "&:hover": { borderColor: "purple" },
              }}
            >
              NEXT
            </Button>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
