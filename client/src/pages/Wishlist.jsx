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
import { useQuery } from "@tanstack/react-query";
import { get } from "../services/services";
import { wishlist } from "../routes/routes";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

export const Wishlist = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist-list"],
    queryFn: () => get(wishlist),
    retry: false,
  });

  if (isLoading) return <Loading />;

  return (
    <Container sx={{ mt: 4 }}>
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
            {data &&
              data?.data.items.map((row, index) => (
                <TableRow key={`wishlist-item-${index}`}>
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
                        src={row.imageUrl}
                        alt="alt-image"
                      />
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body1">
                      <Link
                        style={{ color: "black" }}
                        to={`/product/${row.id}`}
                      >
                        {row.name}
                      </Link>
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
                      sx={{ width: 85 }}
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
    </Container>
  );
};
