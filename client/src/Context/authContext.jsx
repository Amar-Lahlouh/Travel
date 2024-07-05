import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

//krmal fne klshy 23rdu hsb al userID le ana fuwattu
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (data) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", data, {
      withCredentials: true,
    });
    const user = res.data?.user;
    console.log("user login", user);
    if (user.Role == 1) {
      console.log("Role 1");
      window.location.href = "/guidelineprofile";
    } else if (user.Role == 2) {
      console.log("Role 2");
      window.location.href = "/";
    } else if (user.Role == 3) {
      console.log("Role 3");
      window.location.href = "/admin";
    } else console.log("-".repeat(50));
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    console.log("Context");
    const refresh = async () => {
      const res = await axios.post(
        "http://localhost:3000/api/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (!res.data.valid) return console.log("not valid token");
      console.log("-".repeat(50));
      const userRes = await axios.get(`http://localhost:3000/api/user/me`, {
        withCredentials: true,
      });
      const languages = userRes.data[0].language
        ? userRes.data.map((u) => ({
            label: u.language,
            value: u.language.toLowerCase(),
          }))
        : [];
      const userData = {
        ...userRes.data[0],
        language: undefined,
        languages,
      };
      console.log(userData);
      setCurrentUser({ user: userData });
    };
    currentUser || refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
