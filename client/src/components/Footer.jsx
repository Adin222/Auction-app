import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#1c1c1c", color: "#ffffff", p: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            AUCTION
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            About Us
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Terms and Conditions
          </Typography>
          <Typography variant="body2">Privacy and Policy</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            GET IN TOUCH
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Call Us at +123 797-567-2535
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            support@auction.com
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton sx={{ color: "#ffffff" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: "#ffffff" }}>
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ minWidth: "250px" }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            NEWSLETTER
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter your email address and get notified about new products. We
            hate spam!
          </Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              placeholder="Your Email Address"
              variant="filled"
              size="small"
              sx={{
                backgroundColor: "#2c2c2c",
                borderRadius: 1,
                input: { color: "#ffffff" },
                "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                  {
                    borderBottom: "none",
                  },
              }}
            />
            <Button
              variant="outlined"
              sx={{ color: "#ffffff", borderColor: "#7c4dff" }}
            >
              GO &nbsp; &gt;
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
