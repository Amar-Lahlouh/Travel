import jwt from "jsonwebtoken";

export const VerifyAuth = (req, res, next) => {
  const token = req.cookies.accessToken; //get the token form cookies

  if (!token) return console.log("token", token);
  jwt.verify(token, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    // console.log("decoded", decoded);
    req.user = decoded; // userid & role
    next();
  });
};
