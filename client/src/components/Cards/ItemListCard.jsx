import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GavelIcon from "@mui/icons-material/Gavel";

export const ItemListCard = () => {
  return (
    <Card sx={{ boxShadow: "none", maxWidth: 800, mt: 5 }}>
      <Stack direction="row" spacing={2}>
        <CardMedia
          sx={{ width: 280, height: 250, objectFit: "cover", borderRadius: 1 }}
          component="img"
          image="https://mockupmark.com/api/templates/bella-canvas-6400-1.jpg"
          alt="product"
        />
        <CardContent sx={{ p: 0 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              Shoes Collection
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum hendrerit odio a erat lobortis auctor. Curabitur
              sodales pharetra placerat. Aenean auctor luctus tempus.
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "purple", fontWeight: 600 }}
            >
              Start From $59.00
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
              <Button
                variant="outlined"
                size="small"
                endIcon={<GavelIcon />}
                sx={{
                  textTransform: "none",
                  border: "1px solid grey",
                  color: "grey",
                  borderRadius: 0,
                }}
              >
                Bid
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};
