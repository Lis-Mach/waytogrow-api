const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

module.exports = {
  check: (req, res, next) => {
    const authHeader = req.headers["authorization"];

    //if we have not authorization headers, we receive in return 401 Unauthorized error
    if (!authHeader) {
      return res.status(401).json({
        error: {
          message: "Authorization Headers not provided in the request",
        },
      });
    }

    // if Bearer authorization header is not provided, we receive in return 401 Unauthorized error
    if (!authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        error: {
          message: "Invalid authoriation mechanism",
        },
      });
    }

    const token = authHeader.split(" ")[1];

    //if Bearer authorization header is provided , but token is not provided then return
    //401 Unauthorization error

    if (!token) {
      return res.status(401).json({
        error: {
          message: "Bearer token missing in the authorization headers",
        },
      });
    }

    //Possible thrown errors during verification. Error is the first argument of the verification callback.

    jwt.verify(token, jwtSecret, (errorr, user) => {
      if (errorr) {
        return res.status(403).json({
          error: "Invalid user or password provided, please log in again.",
        });
      }
      req.user = user;
      next();
    });
  },
};
