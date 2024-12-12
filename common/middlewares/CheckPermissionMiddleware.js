const UserModel = require("../models/user");
// const util = require('util')

module.exports = {
  has: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;
      // to jest rowne:
      // const userId = req.user.userId;
      // const {
      //     user: { userId: userId },
      //   } = req
      // const {
      //   user: { userId },
      // } = req

      UserModel.findUser({ id: userId }).then((user) => {

        console.log(`userid to jest : ${userId}`);
        // IF user does not exist in our database, means something is wrong
        // THEN we will return forbidden error and ask user to login again
        if (!user) {
          return res.status(401).json({
            error: "Invalid access token provided, please login again.",
          });
        }

        const userRole = user.role;

        // IF user does not possess the required role
        // THEN return forbidden error
        if (userRole !== role) {
          return res.status(403).json({
            error: `You need to be a ${role} to access this endpoint.`,
          });
        }

        next();
      });
    };
  },
};
