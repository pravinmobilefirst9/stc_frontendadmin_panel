import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Loader from "./Loader";
import { resetPassword } from "api/api";

export default function ResetpasswordModal({
  open,
  setOpen,
  handleClickOpen,
  handleResetPassword,
  error,
}) {
  //   const [open, setOpen] = React.useState(false);
  //   const [loader, setLoader] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  //   const reset_password=async()=>{

  //     await resetPassword()
  //   }

  return (
    <div>
      {/* {loader === true && <Loader />} */}

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ fontSize: "20px" }}>
          {"Reset password"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: 500,
              //   maxWidth: "100%",
              marginTop: "5px",
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              placeholder="Enter new password"
            />
            <span style={{ color: "red", marginLeft: "5px" }}>
              {error && error}
            </span>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleClose()}
            //   style={{ color: "black" }}
          >
            Close
          </Button>
          <Button
            onClick={() => handleResetPassword()}
            autoFocus
            style={{ color: "rgb(255, 102, 0)" }}
          >
            reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
