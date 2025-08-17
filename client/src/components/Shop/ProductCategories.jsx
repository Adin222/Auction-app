import { List, ListItemButton, Typography, Box } from "@mui/material";
import { Add } from "@mui/icons-material";

export const ProductCategories = () => {
  return (
    <Box sx={{ width: 250, border: "1px solid lightgrey", p: "10px" }}>
      <Typography
        variant="subtitle2"
        sx={{ color: "purple", mb: 1, fontWeight: 620 }}
      >
        PRODUCT CATEGORIES
      </Typography>

      <List disablePadding>
        <ListItemButton sx={{ fontWeight: "bold", color: "grey" }}>
          Technology <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton sx={{ fontWeight: "bold", color: "grey" }}>
          Clothing <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton sx={{ fontWeight: "bold", color: "grey" }}>
          Furniture <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton sx={{ fontWeight: "bold", color: "grey" }}>
          Books <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
        <ListItemButton sx={{ fontWeight: "bold", color: "grey" }}>
          Sports <Add style={{ marginLeft: "auto" }} fontSize="small" />
        </ListItemButton>
      </List>
    </Box>
  );
};
