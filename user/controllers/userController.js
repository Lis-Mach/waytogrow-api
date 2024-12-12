//Added the ability to filter users by query and delete or change the user role by the admin

const UserModel = require("./../../common/models/user");

module.exports = {
  findUser: (req, res) => {
    const {
      user: { userId },
    } = req;

    UserModel.findUser({ id: userId })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            login: user.login,
            email: user.email,
          },
        });
      })

      .catch((errorr) => {
        return res.status(404).json({
          status: false,
          error: errorr,
        });
      });
  },

  updateUser: (req, res) => {
    const {
      user: { userId },
      body: payload,
    } = req;


    //if body is empty, update is not needed
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty. User is without update",
        },
      });
    }

    UserModel.updateUser({ id: userId }, payload)
      .then(() => {
        return UserModel.findUser({ id: userId });
      })
      .then((user) => {
        return res.status(201).json({
          status: true,
          data: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            login: user.login,
            email: user.email,
          }
        });
      })
      .catch((errorr) => {
        return res.status(400).json({
          status: false,
          error: errorr,
        });
      });
  },

  deleteUser: (req, res) => {
    const {
      params: { userId },
    } = req;
    console.log(req);

    UserModel.deleteUser({ id: userId })
      .then(() => {
        return res.status(200).json({
          status: true,
          data: {
            message: "User was deleated successfully",
          },
        });
      })
      .catch((errorr) => {
        return res.status(404).json({
          status: false,
          error: errorr,
        });
      });
  },

  getAllUsers: (req, res) => {
    UserModel.findAllUsers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((errorr) => {
        return res.status(404).json({
          status: false,
          error: errorr,
        });
      });
  },

  changeRole: (req, res) => {
    const {
      params: { userId },
      body: { role },
    } = req;

    UserModel.updateUser({ id: userId }, { role: role })
      .then(() => {
        return UserModel.findUser({ id: userId });
      })
      .then((user) => {
        return res.status(201).json({
          status: true,
          data: user,
        });
      })
      .catch((errorr) => {
        console.log(errorr);
        return res.status(400).json({
          status: false,
          error: errorr,
        });
      });
  },
};
