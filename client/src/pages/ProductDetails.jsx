import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { TextField, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GavelIcon from "@mui/icons-material/Gavel";

import { get } from "../services/services";
import { getProduct } from "../routes/routes";

export const ProductDetails = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["item-detail", params.productId],
    queryFn: () => get(`${getProduct}${params.productId}`),
    retry: false,
  });

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (data?.data?.imageUrl1) {
      setMainImage(data.data.imageUrl1);
    }
  }, [data]);

  if (isLoading || !data) return <Loading />;

  const thumbnails = [
    data.data.imageUrl1,
    data.data.imageUrl2,
    data.data.imageUrl3,
  ];
  return (
    <Box className="container mt-5">
      <Box className="row">
        <Box className="col-md-6 mb-4">
          <img
            src={mainImage}
            alt="Product"
            className="img-fluid rounded mb-3 product-image"
            id="mainImage"
          />
          <Box className="d-flex justify-content-between">
            {thumbnails.map((thumb, idx) => (
              <img
                key={idx}
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                className={`thumbnail rounded ${
                  mainImage === thumb ? "border border-primary" : ""
                }`}
                style={{ cursor: "pointer", width: "100px" }}
                onClick={() => setMainImage(thumb)}
              />
            ))}
          </Box>
        </Box>

        <Box className="col-md-6">
          <h2 className="mb-3">{data?.data.productName}</h2>

          <Stack direction="column" spacing={2} sx={{ marginBottom: "20px" }}>
            <span className="h4 me-2">
              Starting at: ${data?.data.startingPrice.toFixed(2)}
            </span>
            <span className="h4 me-2">Highest bid (current): $349.99</span>
          </Stack>

          <p className="mb-4">{data?.data.description}</p>

          <Stack direction="row" spacing={2} sx={{ marginBottom: "30px" }}>
            <TextField
              label="Your bid"
              variant="outlined"
              type="number"
              size="small"
            />
            <Button
              startIcon={<GavelIcon />}
              sx={{
                backgroundColor: "white",
                color: "grey",
                border: "1px solid grey",
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: "purple",
                  color: "white",
                },
              }}
            >
              Place Bid
            </Button>
          </Stack>

          <Button
            startIcon={<FavoriteBorderIcon />}
            sx={{
              backgroundColor: "white",
              color: "grey",
              border: "1px solid grey",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "purple",
                color: "white",
              },
            }}
          >
            Add to Wishlist
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
