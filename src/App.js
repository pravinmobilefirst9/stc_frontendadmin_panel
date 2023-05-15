import React from "react";
import UserList from "./views/UserList";
import UserSetting from "./views/UserSetting";
import RequestList from "./views/RequestList";
import Otp from "./views/Otp";
import Auth from "./views/Auth";
import ApprovedList from "./views/ApprovedList";
import AdminTokenTransfer from "./views/AdminTokenTransfer";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const admin = sessionStorage.getItem("admin");
  return (
    <Routes>
      <Route path="/" exact element={<Auth />} />
      {/* <Route path="/verify-otp" exact element={<Otp />} /> */}
      <Route path="/user-list" exact element={<UserList />} />
      <Route path="/user/setting/:id" exact element={<UserSetting />} />
      <Route path="/dashboard" exact element={<RequestList />} />
      <Route path="/approved-list" exact element={<ApprovedList />} />
      <Route path="/token-transfer" exact element={<AdminTokenTransfer />} />
    </Routes>
  );
}

export default App;
