import jwt from "jsonwebtoken";

export const VerifyAdmin = (req, res, next) => {
  if (req.user.role != 3)
    return res.status(401).json({ message: "Unauthorized" });
  next();
};
