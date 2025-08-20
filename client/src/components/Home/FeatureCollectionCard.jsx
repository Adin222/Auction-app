import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const FeatureCollectionCard = ({ image, collection, price }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("/shop/all-categories")}
      sx={{
        maxWidth: 365,
        boxShadow: "none",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="340"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {collection}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Start from {price}
        </Typography>
      </CardContent>
    </Card>
  );
};
