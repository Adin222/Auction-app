import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Container,
  Stack,
} from "@mui/material";
import { FeatureCollectionCard } from "../components/Home/FeatureCollectionCard";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#f9f9f9",
          p: 4,
          borderRadius: 2,
          mb: 5,
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ maxWidth: "50%" }}>
              <Typography variant="h2" gutterBottom>
                Running Shoes
              </Typography>
              <Typography
                variant="h6"
                color="purple"
                fontWeight="bold"
                gutterBottom
              >
                Start from - $240.00
              </Typography>
              <Typography variant="h6" mb={2} sx={{ width: 500 }}>
                Discover rare pieces of style and energy. Step into authentic
                auctions. Find the unexpected here, and feel inspired.
              </Typography>
              <Button
                onClick={() => navigate("/shop/all-categories")}
                variant="outlined"
                color="secondary"
              >
                BID NOW
              </Button>
            </Box>

            <CardMedia
              component="img"
              image="shoes.png"
              alt="Running Shoes"
              sx={{ maxWidth: 300, borderRadius: 2 }}
            />
          </Box>
        </Container>
      </Box>
      <Container>
        <Stack>
          <Typography variant="h5">Feature Collection</Typography>
          <hr />
          <Stack direction="row" justifyContent="space-between">
            <FeatureCollectionCard
              image={"shirt1.jpg"}
              collection={"Clothes Collection"}
              price={49.99}
            />
            <FeatureCollectionCard
              image={"phone.jpg"}
              collection={"Technology Collection"}
              price={599.99}
            />
            <FeatureCollectionCard
              image={"furniture.jpg"}
              collection={"Furniture Collection"}
              price={69.99}
            />
          </Stack>
        </Stack>

        <Stack sx={{ mt: 6 }}>
          <Typography variant="h5">Feature products</Typography>
          <hr />
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <FeatureCollectionCard
              image={"shoes2.webp"}
              collection={"Shoes"}
              price={49.99}
            />
            <FeatureCollectionCard
              image={"gaming.avif"}
              collection={"Gaming"}
              price={599.99}
            />
            <FeatureCollectionCard
              image={"racket.jpg"}
              collection={"Sports"}
              price={69.99}
            />
            <FeatureCollectionCard
              image={"furniture.jpg"}
              collection={"Furniture"}
              price={69.99}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
