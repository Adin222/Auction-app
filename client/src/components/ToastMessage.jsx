import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export const ToastMessage = ({ data, handleClose }) => {
  return (
    <Box>
      <Snackbar
        key={data.message}
        open={data.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={data.status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {data.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
