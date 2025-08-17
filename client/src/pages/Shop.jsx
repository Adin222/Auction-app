import { useState } from "react";
import Box from "@mui/material/Box";
import { ItemCard } from "../components/Cards/ItemCard";
import { ItemListCard } from "../components/Cards/ItemListCard";
import { ProductCategories } from "../components/Shop/ProductCategories";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import { Sort } from "../components/Shop/Sort";
import { Grid } from "@mui/material";
import { Button, Stack } from "@mui/material";

export const Shop = () => {
  const [mode, setMode] = useState("Grid");
  return (
    <Box display="flex">
      <Box sx={{ width: 220, mr: 7 }}>
        <ProductCategories />
      </Box>

      <Box flex={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Sort />
          <Box>
            <Button
              onClick={() => setMode("Grid")}
              startIcon={<ViewCompactIcon />}
              sx={{
                mr: 1,
                backgroundColor: mode === "Grid" ? "purple" : "white",
                color: mode === "Grid" ? "white" : "black",
                fontWeight: 600,
                borderRadius: 0,
                width: "90px",
              }}
            >
              Grid
            </Button>
            <Button
              onClick={() => setMode("List")}
              startIcon={<FormatListBulletedIcon />}
              sx={{
                mr: 1,
                backgroundColor: mode !== "Grid" ? "purple" : "white",
                color: mode !== "Grid" ? "white" : "black",
                borderRadius: 0,
                fontWeight: 600,
                width: "90px",
              }}
            >
              List
            </Button>
          </Box>
        </Box>

        {mode === "Grid" && (
          <Box>
            <ItemListCard />
            <ItemListCard />
            <ItemListCard />
            <ItemListCard />
            <ItemListCard />
          </Box>
        )}

        {mode === "List" && (
          <Grid container spacing={7}>
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ItemCard />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
