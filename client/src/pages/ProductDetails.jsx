import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { TextField, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GavelIcon from "@mui/icons-material/Gavel";
import { formatDate } from "../utils/utils";

import { get, post } from "../services/services";
import { getProduct, postWishlist } from "../routes/routes";
import useUserState from "../hooks/useUserState";
import { ToastMessage } from "../components/ToastMessage";

export const ProductDetails = () => {
  const [toastMessage, setToastMessage] = useState({
    status: "",
    open: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { role } = useUserState();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["item-detail", params.productId],
    queryFn: () => get(`${getProduct}${params.productId}`),
    retry: false,
  });

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (data?.data?.product.imageUrl1) {
      setMainImage(data.data.product.imageUrl1);
    }
  }, [data]);

  if (isLoading || !data) return <Loading />;

  const thumbnails = [
    data.data.product.imageUrl1,
    data.data.product.imageUrl2,
    data.data.product.imageUrl3,
  ];

  const handleWishlist = async () => {
    setLoading(true);
    const response = await post(`${postWishlist}${params.productId}`, {});

    if (response.status === 200) {
      setToastMessage({
        status: "success",
        message: response.data.message,
        open: true,
      });
      refetch();
      setLoading(false);
    } else {
      setToastMessage({
        status: "error",
        message: response.data.error,
        open: true,
      });
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
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
            <h2 className="mb-3">{data?.data.product.productName}</h2>

            <Stack direction="column" spacing={2} sx={{ marginBottom: "20px" }}>
              <span className="h4 me-2">
                Starting at: ${data?.data.product.startingPrice.toFixed(2)}
              </span>
              {data?.data.date.amount !== 0 && (
                <span className="h5 me-2">Highest bid (current): $349.99</span>
              )}
            </Stack>

            <Stack
              sx={{ marginTop: "10px", marginBottom: "15px", color: "purple" }}
              direction="column"
            >
              <Typography>
                Start of an auction: {formatDate(data?.data.date.startTime)}
              </Typography>
              <Typography>
                End of an auction: {formatDate(data?.data.date.endTime)}
              </Typography>
            </Stack>

            <p className="mb-4">{data?.data.product.description}</p>

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
                    backgroundColor: "grey",
                    color: "white",
                  },
                }}
              >
                Place Bid
              </Button>
            </Stack>

            {role === "BUYER" && (
              <Button
                disabled={loading}
                loading={loading}
                onClick={handleWishlist}
                startIcon={
                  data?.data.date.wishlisted ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )
                }
                sx={{
                  backgroundColor: "white",
                  color: "grey",
                  border: "1px solid grey",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "white",
                  },
                }}
              >
                Add to Wishlist
              </Button>
            )}
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
