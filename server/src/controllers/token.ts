import * as jwt from "jsonwebtoken";
import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
//------------Verify Token-------------
export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = (<string>authHeader).split(" ")[1];
    jwt.verify(token, "lacile000", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

//------------Verify Token and Authorization-------------

export const verifyTokenAndAuthorization = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

//------------Verify Token and Admin-------------

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
