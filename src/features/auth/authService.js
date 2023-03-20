// Login user
import axios from "axios";

// login
const login = async (data) => {
  const response = await axios.post("/login", data);
  // console.log(response.data.token);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

// Logout user
const logout = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  };
  // console.log(config);
  const response = await axios.post("/logout", {}, config);
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;