import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import WifiIcon from "@mui/icons-material/Wifi";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import { Avatar, Button, Divider, Grid, Typography } from "@mui/material";
import ResetpasswordModal from "ui-component/ResetModal";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect } from "react";
import { useParams } from "react-router";
import { resetPassword, userSetting, user_status_change } from "api/api";
import Loader from "ui-component/Loader";
export default function UserSetting() {
  const [userData, setUserData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [new_password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const params = useParams();

  const handleToggle = async (value) => {
    setLoader(true);
    await user_status_change(userData?.user_id, !checked)
      .then((res) => {
        setLoader(false);
        setChecked(!checked);
      })
      .catch((err) => {
        setLoader(false);
      });
    setLoader(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleResetPassword = async () => {
    // setOpen(true);
    if (new_password.length > 4) {
      await resetPassword(userData?.user_id, new_password)
        .then((res) => {
          console.log("res reset password", res);
        })
        .catch((err) => {
          console.log("err reset password", err);
        });
    } else {
      setError("please enter minimun 5 characters");
    }
  };

  const myStyle = {
    color: checked ? `rgb(255, 102, 0)` : `white`,
  };

  const getUserData = async (id) => {
    const res = await userSetting(id)
      .then((res) => {
        setUserData(res.data);
        setChecked(res.data?.user_status === 0 ? false : true);
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getUserData(params.userid);
  }, [params.userid]);

  return (
    <>
      {loader === true && <Loader />}

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          //   display: "flex",
          //   justifyContent: "center",
        }}
        subheader={
          <ListSubheader
            style={{
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <KeyboardBackspaceIcon /> Back
          </ListSubheader>
        }
      >
        {/* <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h2>User Setting</h2>
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "10px",
          }}
          className="px-4 sm:px-0"
        >
          {userData && userData.length == undefined ? (
            <>
              <div>
                <Typography variant="h3" className="font-bold uppercase">
                  Email
                </Typography>
                <h5 className="text-base font-semibold leading-7 text-gray-900">
                  {userData?.email}
                </h5>
              </div>
              <div>
                <Typography variant="h3" className="font-bold uppercase">
                  User id
                </Typography>
                <h5 className="text-base font-semibold leading-7 text-gray-900">
                  {userData?.user_id}
                </h5>
              </div>
              <div className="">
                <Typography variant="h3" className="font-bold uppercase">
                  Organization id
                </Typography>
                <h5 className="text-base font-semibold leading-7 text-gray-900">
                  {userData?.organization_id}
                </h5>
              </div>
            </>
          ) : (
            ""
          )}

          {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Personal details and application.
                          </p> */}
          <Avatar
            sx={{ width: 100, height: 100 }}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          {/* <img
            style={{ width: "100px", height: "100px" }}
            className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          /> */}
        </div>
        <Divider />
        <ListItem>
          <ListItemText
            id="switch-list-label-wifi"
            primary="Change user status"
          />
          <Switch
            edge="end"
            onChange={() => handleToggle(!checked)}
            checked={checked}
            inputProps={{
              "aria-labelledby": "switch-list-label-wifi",
            }}
            style={myStyle}
          />
        </ListItem>
        <ListItem>
          <ListItemText id="switch-list-label-wifi" primary="Reset password" />
          <Button onClick={() => handleClickOpen()}>Reset</Button>
        </ListItem>

        <ListItem>
          {/* <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon> */}
          <ListItemText
            id="switch-list-label-bluetooth"
            primary="Change User Detail"
          />
          <Button>Change</Button>
        </ListItem>
      </List>
      <ResetpasswordModal
        handleClickOpen={handleClickOpen}
        handleResetPassword={handleResetPassword}
        open={open}
        setOpen={setOpen}
        error={error}
      />
    </>
  );
}
