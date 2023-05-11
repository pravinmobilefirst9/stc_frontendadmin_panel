import axios from "axios";

const url = "https://stcdevelopment-production-c9fd.up.railway.app/api/";

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

export async function userListing() {
  const aUrl = url + "admin/get-user?page=0&pageSize=5";
  const config = {
    method: "get",
    url: aUrl,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  return await axios(config);
}
