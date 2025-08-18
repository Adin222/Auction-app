import { Select, MenuItem, FormControl, Box } from "@mui/material";

export const Sort = ({ order, sortBy, setOrder, setSortBy }) => {
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 200, height: "40px" }}>
        <Select
          MenuProps={{ disableScrollLock: true }}
          value={sortBy}
          onChange={handleSortChange}
          displayEmpty
          sx={{
            backgroundColor: "white",
            borderRadius: 0,
            "& .MuiSelect-select": { padding: "8px 12px" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "darkgray",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "lightgray",
            },
          }}
        >
          <MenuItem value="date">Sort by Date Created</MenuItem>
          <MenuItem value="price">Sort by Price</MenuItem>
          <MenuItem value="name">Sort by Name (A-Z)</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120, height: "40px" }}>
        <Select
          MenuProps={{ disableScrollLock: true }}
          value={order}
          onChange={handleOrderChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 0,
            "& .MuiSelect-select": { padding: "8px 12px" },
            "&.MuiOutlinedInput-notchedOutline": {
              borderColor: "lightgray",
            },
          }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
