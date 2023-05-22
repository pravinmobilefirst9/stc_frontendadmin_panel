import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Pagination,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import SearchSection from "layout/MainLayout/Header/SearchSection";
import { IconSettings } from "@tabler/icons";
import { useState } from "react";
import { useEffect } from "react";
import { userListing } from "api/api";
import Loader from "ui-component/Loader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function SamplePage() {
  const [userData, setUserData] = useState([]);
  const [clientValue, setClientValue] = useState(true);
  const [vendorValue, setVendorValue] = useState(true);
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event, value) => {
    setPage(value);
  };

  const getData = async () => {
    setLoader(true);
    const res = await userListing(page, 5, clientValue, vendorValue);
    if (res?.data && res.data) {
      setLoader(false);
      setTotalPage(Math.ceil(res.data.total_count / 5));
      setUserData(res.data.data);
    }
    setLoader(false);
  };

  const handlecheckboxClient = (value) => {
    setPage(1);
    setClientValue(value.target.checked);
  };
  const handleVendorcheckbox = (value) => {
    setPage(1);
    setVendorValue(value.target.checked);
  };

  useEffect(() => {
    getData();
  }, [clientValue, vendorValue, page]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // width: "100%",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <SearchSection />
        <div>
          <Checkbox
            // defaultChecked
            checked={clientValue}
            label="client"
            style={{ color: "rgb(255, 102, 0)" }}
            onChange={handlecheckboxClient}
          />
          <span>client</span>
          <Checkbox
            checked={vendorValue}
            label="vendor"
            style={{ color: "rgb(255, 102, 0)" }}
            onChange={handleVendorcheckbox}
          />
          <span>vendor</span>
        </div>
      </div>
      {loader === true && <Loader />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="center">User type</StyledTableCell>
              <StyledTableCell align="center">User verified</StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
              <StyledTableCell align="center">Setting</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="center">{row.userType}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.user_verified === true ? "TRUE" : "False"}
                </StyledTableCell>
                <StyledTableCell align="center">{"view"}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACG0lEQVR4nNWXu24VMRCGPyIhwRMgIOESCR4IKRQJCAl2ZnXKtBSkAEE6eAqUiJYgEVo4FOEFQpqTHlDCpSGEQd7dkD27ttcrbZCwNI3tmW9tj8f/wv/SLOO6Ke9N+VCYMLYRcycPFnJTrGGLwwGWOWsrzLT6lWce8JPWvBVm7A5n+kFHzJuyW23jfAP82gN+OTUn42rh62I0/LuhR0GFfVNumXLJlEemfG+BhW8mPDDlvNt2U/Zq491wU06bMvGsyAU/9PZP269A/8TFjsOFzQRAPxM2o9ACfJcLJnwaEPol+bqZcmMwcMbNJGi16svRMy3HtguLn/1Pu8e5dLDyOAJ9bjkX/87NmDVhLQK/HwblXDNFi+JQJtePENTrD6dMWQ+AvxZ3X3hqGeJYx47lZe9KksP6SlvwEXNJV04Y18FbCYmy3XlEwscE8NbwYGWnH1h5l7TVGbMRqCupvxPivJ0+n4wlE1ZNeeWtx6XTmkskb3IJL4LJJWxUsRejxcQ9c5GvXq87FysNQ+PXqdks50pnAXGJVCZTeHuFg34FRLidkGxplrGUBi0f8f3BwO6tzmtFwwt1ciWlmPSHj30yalpn1dVH81y7AQeBsd1O/dWSPspnUxaqkvjQW8enpc9C5XMMHfXTXZPiwWjUZ1PeeMAbLTFRisJJMvSohTSSV94Kq4G5cZ3Vp1XP58kJekLg5i+Mq/P/4hdmqPYH92RW4CVOLtQAAAAASUVORK5CYII=" />{" "} */}
                  <Link to={`/dashboard/user-setting/${row.user_id}`}>
                    <IconSettings
                      stroke={1.5}
                      size="1.5rem"
                      // color={theme.palette.primary.main}
                      style={{ cursor: "pointer" }}
                      color="rgb(255, 102, 0)"
                      // onClick={navigate(`dashboard/user-setting/${row.user_id}`)}
                    />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Pagination count={10} /> */}
      </TableContainer>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination count={totalPage} color="primary" onChange={handleChange} />
      </div>
    </>
  );
}

// // material-ui
// import { Typography } from '@mui/material';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';

// // ==============================|| SAMPLE PAGE ||============================== //

// const SamplePage = () => (
//     <MainCard title="Sample Card">
//         <Typography variant="body2">
//             Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
//             ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
//             reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
//             qui officiate descent molls anim id est labours.
//         </Typography>
//     </MainCard>
// );

// export default SamplePage;
