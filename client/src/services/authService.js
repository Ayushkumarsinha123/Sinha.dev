import API from "../utils/api";

export const signupUser = async (userData) => {
  const res = await API.post("/users/register", userData);
  return res.data;
}

export const loginUser = async (userData) => {
    const res = await API.post("/users/login", userData);
    return res.data;
}