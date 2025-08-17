import { useState } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

export const Sort = () => {
  const [sortValue, setSortValue] = useState("default");

  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 200, height: "40px" }}>
      <Select
        MenuProps={{ disableScrollLock: true }}
        value={sortValue}
        onChange={handleChange}
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
        <MenuItem value="default">Default Sorting</MenuItem>
        <MenuItem value="popularity">Sort by Popularity</MenuItem>
        <MenuItem value="rating">Sort by Rating</MenuItem>
        <MenuItem value="newness">Sort by Newness</MenuItem>
        <MenuItem value="price">Sort by Price</MenuItem>
      </Select>
    </FormControl>
  );
};
