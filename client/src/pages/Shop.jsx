import { useState } from "react";
import Box from "@mui/material/Box";
import { ItemCard } from "../components/Cards/ItemCard";
import { ItemListCard } from "../components/Cards/ItemListCard";
import { ProductCategories } from "../components/Shop/ProductCategories";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import { Sort } from "../components/Shop/Sort";
import { Grid, Button } from "@mui/material";

import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../services/services";
import { getProducts } from "../routes/routes";
import { Container } from "@mui/material";

export const Shop = () => {
  const [mode, setMode] = useState("Grid");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("asc");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-products", category, sortBy, order],
      queryFn: ({ pageParam = 0 }) =>
        get(
          `${getProducts}?category=${category}&sortBy=${sortBy}&order=${order}&page=${pageParam}&size=8`
        ),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.length < 8) return undefined;
        return allPages.length;
      },
      retry: false,
    });

  const products = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex">
        <Box sx={{ width: 220, mr: 7 }}>
          <ProductCategories setCategory={setCategory} />
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
            <Sort
              sortBy={sortBy}
              order={order}
              setSortBy={setSortBy}
              setOrder={setOrder}
            />
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
              {products.map((product) => (
                <ItemListCard key={product.id} product={product} />
              ))}
            </Box>
          )}

          {mode === "List" && (
            <Grid container spacing={7}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ItemCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{
                  textTransform: "none",
                  borderRadius: 0,
                  backgroundColor: "white",
                  width: 150,
                  border: "1px solid grey",
                  color: "grey",
                  "&:hover": {
                    backgroundColor: "purple",
                    color: "white",
                  },
                }}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
