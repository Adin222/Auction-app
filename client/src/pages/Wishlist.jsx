import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";

const rows = [
  {
    id: "#2345678",
    name: "Monogrammed Rain Jacket - Two Color",
    timeLeft: "0s",
    highestBid: 120,
    status: "OPEN",
  },
  {
    id: "#2345678",
    name: "Gloria Vs Womens Embellished Jeans",
    timeLeft: "0s",
    highestBid: 96,
    status: "CLOSED",
  },
  {
    id: "#2345678",
    name: "Women Short Sleeve Fashion Shirt",
    timeLeft: "0s",
    highestBid: 80,
    status: "CLOSED",
  },
  {
    id: "#2345678",
    name: "Unisex Power Belt Hot",
    timeLeft: "1 week",
    highestBid: 130,
    status: "OPEN",
  },
  {
    id: "#2345678",
    name: "Dragon Ball",
    timeLeft: "3s",
    highestBid: 92,
    status: "CLOSED",
  },
];

export const Wishlist = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 900, margin: "auto", mt: 4 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Time left</TableCell>
            <TableCell>Highest Bid</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "grey.300",
                    borderRadius: 1,
                  }}
                >
                  <img
                    style={{ width: 60, height: 60 }}
                    src="https://calcetto.in/cdn/shop/files/PIX_5297copy.jpg?v=1744199891&width=1500"
                    alt="alt-image"
                  />
                </Box>
              </TableCell>

              <TableCell>
                <Typography variant="body1">{row.name}</Typography>
                <Typography variant="body2" color="primary">
                  {row.id}
                </Typography>
              </TableCell>

              <TableCell>{row.timeLeft}</TableCell>

              <TableCell>
                <Typography color="green">
                  ${row.highestBid.toFixed(2)}
                </Typography>
              </TableCell>

              <TableCell>
                <Chip
                  sx={{ width: 85}}
                  label={row.status}
                  color={row.status === "OPEN" ? "success" : "error"}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
