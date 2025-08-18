import { List, ListItemButton, Typography, Box } from "@mui/material";
import { Add } from "@mui/icons-material";

export const ProductCategories = ({ setCategory }) => {
  return (
    <Box sx={{ width: 250, border: "1px solid lightgrey", p: "10px" }}>
      <Typography
        variant="subtitle2"
        sx={{ color: "purple", mb: 1, fontWeight: 620 }}
      >
        PRODUCT CATEGORIES
      </Typography>

      <List disablePadding>
        <ListItemButton
          onClick={() => setCategory("")}
          sx={{ fontWeight: "bold", color: "grey" }}
        >
          All products <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setCategory("technology")}
          sx={{ fontWeight: "bold", color: "grey" }}
        >
          Technology <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setCategory("clothing")}
          sx={{ fontWeight: "bold", color: "grey" }}
        >
          Clothing <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setCategory("furniture")}
          sx={{ fontWeight: "bold", color: "grey" }}
        >
          Furniture <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setCategory("books")}
          sx={{ fontWeight: "bold", color: "grey" }}
        >
          Books <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setCategory("sports")}
          sx={{ fontWeight: "bold", color: "grey" }}
        >
          Sports <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
      </List>
    </Box>
  );
};
