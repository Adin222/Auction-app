import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GavelIcon from "@mui/icons-material/Gavel";
import Box from "@mui/material/Box";

export const ItemCard = ({ product }) => {
  return (
    <Card
      sx={{
        width: 250,
        boxShadow: "none",
        marginTop: 2,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{ height: 250, objectFit: "contain" }}
          component="img"
          image={product.imageUrl1}
          alt={product.productName || "Product"}
        />
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            endIcon={<FavoriteBorderIcon />}
            sx={{
              textTransform: "none",
              border: "1px solid grey",
              color: "grey",
              borderRadius: 0,
              width: "120px",
            }}
          >
            Watchlist
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<GavelIcon />}
            sx={{
              textTransform: "none",
              border: "1px solid grey",
              color: "grey",
              borderRadius: 0,
              width: "120px",
            }}
          >
            Bid
          </Button>
        </Box>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.productName || "Item name"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Start from: ${product.startingPrice || "59.99"}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
