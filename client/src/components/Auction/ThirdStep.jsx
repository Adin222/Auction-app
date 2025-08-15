import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { CountryCitySelector } from "../CountryCitySelector";

export const ThirdStep = ({ setStep, handleAuction, body, saveToLocal }) => {
  const inputSpacing = 2;
  const [error, setError] = useState("");

  const validateAndDone = async () => {
    if (
      !body.address ||
      !body.country ||
      !body.city ||
      !body.zipCode ||
      !body.phone
    ) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    await saveToLocal(body);
    // api here
    console.log("All set");
  };

  return (
    <Box
      sx={{
        minWidth: 500,
        width: "100%",
        mx: "auto",
        mt: 5,
        border: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ backgroundColor: "#fafafa", p: 2 }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          LOCATION & SHIPPING
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Box sx={{ mt: inputSpacing }}>
          <Typography>Address</Typography>
          <TextField
            fullWidth
            name="address"
            onChange={handleAuction}
            value={body.address}
            placeholder="e.g. 676 Berge Tunnel Apt. 278"
            sx={{ mt: 1 }}
          />
        </Box>

        <Box sx={{ mt: inputSpacing }}>
          <CountryCitySelector handleAuction={handleAuction} body={body} />
        </Box>

        <Box sx={{ mt: inputSpacing }}>
          <Typography>Zip Code</Typography>
          <TextField
            fullWidth
            onChange={handleAuction}
            value={body.zipCode}
            name="zipCode"
            placeholder="e.g. 71000"
            sx={{ mt: 1 }}
          />
        </Box>

        <Box sx={{ mt: inputSpacing }}>
          <Typography>Phone</Typography>
          <TextField
            fullWidth
            onChange={handleAuction}
            value={body.phone}
            name="phone"
            placeholder="e.g. +387 61 234 567"
            sx={{ mt: 1 }}
          />
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setStep(2);
              saveToLocal(body);
            }}
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
            variant="contained"
            onClick={validateAndDone}
            sx={{
              px: 3,
              borderColor: "purple",
              color: "white",
              backgroundColor: "purple",
              "&:hover": { borderColor: "purple" },
            }}
          >
            DONE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
