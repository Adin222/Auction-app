import React from "react";
import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { CountryCitySelector } from "../CountryCitySelector";
import { uploadMultiplePhotos } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../ToastMessage";

import { post } from "../../services/services";

import { createAuction } from "../../routes/routes";

export const ThirdStep = ({ setStep, handleAuction, body, saveToLocal }) => {
  const navigate = useNavigate();
  const inputSpacing = 2;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    open: false,
    message: "",
    status: "",
  });

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
    setLoading(true);
    let payload = {};

    try {
      const downloadedURLs = await uploadMultiplePhotos(body.photos);

      payload = {
        name: body.name,
        category: body.category,
        startPrice: Number(body.startPrice),
        startDate: body.startDate,
        endDate: body.endDate,
        address: body.address,
        country: body.country,
        city: body.city,
        description: body.description,
        zipCode: body.zipCode,
        phone: body.phone,
        imageUrl1: downloadedURLs[0],
        imageUrl2: downloadedURLs[1],
        imageUrl3: downloadedURLs[2],
      };
    } catch (error) {
      console.log("ERROR: ", error);
    }

    const response = await post(createAuction, payload);

    if (response.status === 200) {
      setToastMessage({
        open: true,
        message: response.data.message,
        status: "success",
      });
      localStorage.removeItem("auctionForm");
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, [1500]);
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
              disabled={loading}
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
              loading={loading}
              disabled={loading}
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
      <ToastMessage
        data={toastMessage}
        handleClose={() => setToastMessage(false)}
      />
    </React.Fragment>
  );
};
