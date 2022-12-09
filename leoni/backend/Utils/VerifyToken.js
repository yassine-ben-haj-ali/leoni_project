import jwt from "jsonwebtoken";
import { createError } from "../Utils/Error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Accès refusée!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token invalid"));
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Administrateur") {
      next();
    } else {
      return next(createError(403, "Accès refusé vous êtes utilisateur !!"));
    }
  });
};


