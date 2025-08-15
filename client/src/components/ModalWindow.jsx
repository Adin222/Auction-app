import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

export const ModalWindow = ({
  open,
  setOpen,
  text,
  handleFunction,
  loading,
}) => {
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Confirmation</DialogTitle>
          <Divider />
          <DialogContent>{text}</DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              variant="solid"
              color="danger"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="plain"
              color="neutral"
              onClick={handleFunction}
            >
              Confirm
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
