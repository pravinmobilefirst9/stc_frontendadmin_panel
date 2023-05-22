import axios from "axios";

// const url = "http://localhost:9000/api/";
// const url = "https://stcdevelopment-production-c9fd.up.railway.app/api/";
const url = "https://stcdevelopment-production-f85a.up.railway.app/api/";

export function getToken() {
  return localStorage.getItem("auth-token");
}

export function setToken(data) {
  return localStorage.setItem("auth-token", data);
}

export async function login(username, password) {
  const aUrl = url + "admin/login-admin";
  return await axios.post(aUrl, { username, password });
}
// export async function userListing(data) {
//   const aUrl = url + "admin/get-user?page=0&pageSize=5";
//   return await axios.get(aUrl);
// }

export async function userListing(page, pageSize, client, vendor) {
  const clientValue = client === true ? 1 : 0;
  const vendorValue = vendor === true ? 1 : 0;
  const pages = page === 1 ? 0 : page - 1;
  const aUrl =
    url +
    `admin/get-user?page=${pages}&pageSize=${pageSize}&client=${clientValue}&vendor=${vendorValue}`;
  // const aUrl = url + "admin/get-user?page=0&pageSize=5";
  const config = {
    method: "get",
    url: aUrl,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return await axios(config);
}
export async function userSearch(searchText, page, pageSize, client, vendor) {
  const clientValue = client === true ? 1 : 0;
  const vendorValue = vendor === true ? 1 : 0;
  const aUrl =
    url +
    `admin/user-table-filter?search_text=${searchText}&page=${page}&pageSize=${pageSize}&client=${clientValue}&vendor=${vendorValue}`;
  const config = {
    method: "get",
    url: aUrl,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  return await axios(config);
}
export async function userSetting(userid) {
  const aUrl = url + `admin/get-user-setting-data?user_id=${userid}`;
  const config = {
    method: "get",
    url: aUrl,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  return await axios(config);
}
export async function resetPassword(userid, newPassword) {
  const aUrl =
    url +
    `admin/user-password-reset?user_id=${userid}&new_password=${newPassword}`;
  const config = {
    method: "put",
    url: aUrl,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  return await axios(config);
}
export async function user_status_change(userid, status) {
  const user_status = status === true ? 1 : 0;
  const aUrl =
    url + `admin/change-user-status?user_id=${userid}&status=${user_status}`;
  const config = {
    method: "put",
    url: aUrl,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  return await axios(config);
}
