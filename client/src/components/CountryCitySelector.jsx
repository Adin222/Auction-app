import { useState } from "react";
import { Stack, Select, MenuItem } from "@mui/material";

const countries = {
  bosnia: ["Sarajevo", "Mostar", "Banja Luka", "Tuzla"],
  croatia: ["Zagreb", "Split", "Rijeka", "Osijek"],
  serbia: ["Belgrade", "Novi Sad", "Niš", "Kragujevac"],
  slovenia: ["Ljubljana", "Maribor", "Koper", "Celje"],
  montenegro: ["Podgorica", "Nikšić", "Herceg Novi", "Budva"],
};

export const CountryCitySelector = ({ body, handleAuction }) => {
  return (
    <Stack direction="row" spacing={3}>
      <Select
        fullWidth
        displayEmpty
        value={body.country}
        name="country"
        onChange={handleAuction}
      >
        <MenuItem value="">Select Country</MenuItem>
        {Object.keys(countries).map((country) => (
          <MenuItem key={country} value={country}>
            {country.charAt(0).toUpperCase() +
              country.slice(1).replace("-", " & ")}
          </MenuItem>
        ))}
      </Select>

      <Select
        fullWidth
        displayEmpty
        value={body.city}
        name="city"
        onChange={handleAuction}
        disabled={!body.country}
      >
        <MenuItem value="">Select City</MenuItem>
        {body.country &&
          countries[body.country].map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
      </Select>
    </Stack>
  );
};
