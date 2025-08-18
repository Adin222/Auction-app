import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GavelIcon from "@mui/icons-material/Gavel";

import { useNavigate } from "react-router-dom";

export const ItemListCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ boxShadow: "none", maxWidth: 800, mt: 5 }}>
      <Stack direction="row" spacing={2}>
        <CardMedia
          onClick={() => navigate(`/product/${product.id}`)}
          sx={{
            width: 280,
            height: 250,
            objectFit: "cover",
            borderRadius: 1,
            cursor: "pointer",
          }}
          component="img"
          image={product.imageUrl1}
          alt="product"
        />
        <CardContent sx={{ p: 0 }}>
          <Stack direction="column" spacing={2}>
            <Typography
              onClick={() => navigate(`/product/${product.id}`)}
              sx={{ cursor: "pointer" }}
              variant="h6"
              fontWeight="bold"
            >
              {product.productName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "purple", fontWeight: 600 }}
            >
              Start From ${product.startingPrice}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                size="small"
                endIcon={<FavoriteBorderIcon />}
                sx={{
                  textTransform: "none",
                  border: "1px solid grey",
                  color: "grey",
                  borderRadius: 0,
                }}
              >
                Watchlist
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};
