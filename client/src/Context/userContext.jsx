// import axios from "axios";
// import { useEffect } from "react";
// import { useState } from "react";
// import { createContext } from "react";

// export { createContext } from "react";
// export const AuthContext = createContext();

// //krmal fne klshy 23rdu hsb al userID le ana fuwattu
// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState();
//   // JSON.parse(localStorage.getItem("user")) || null
//   /*

// */
//   //here setting usercookie
//   const setUserCookie = (user) => {
//     document.cookie = `user=${JSON.stringify(user)}; path=/`;
//   };

//   // Function to remove user cookie
//   const removeUserCookie = () => {
//     document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   };

//   /*

// */
//   // const login = async (data) => {
//   //   const res = await axios.post("http://localhost:3000/api/auth/login", data);
//   //   setCurrentUser(res.data);
//   // };

//   /*

// */

//   const login = async (data) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/auth/login",
//         data
//       );
//       setCurrentUser(res.data);
//       setUserCookie(res.data);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   /*

// */
//   // const logout = async () => {
//   //   await axios.post("http://localhost:3000/api/auth/logout");
//   //   setCurrentUser(null);
//   // };

//   /*

// */

//   // Function to handle logout
//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/auth/logout");
//       setCurrentUser(null);
//       removeUserCookie();
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   //hl2 hun hsb b2a al le bda5lo btt8yr al localStorage

//   // useEffect(() => {
//   //   localStorage.setItem("user", JSON.stringify(currentUser));
//   // }, [currentUser]);

//   // Effect to read user from cookie on component mount
//   useEffect(() => {
//     const userCookie = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("user="));
//     if (userCookie) {
//       const userData = JSON.parse(userCookie.split("=")[1]);
//       setCurrentUser(userData);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
