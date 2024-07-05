import jwt from "jsonwebtoken";

export const VerifyGuideline = (req, res, next) => {
  if (req.user.role != 1)
    return res.status(401).json({ message: "Unauthorized" });
  next();
};
