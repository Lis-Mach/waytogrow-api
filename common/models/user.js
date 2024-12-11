const { DataTypes } = require("sequelize");
const { roles } = require("../../config");

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: roles.USER,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define(
      "user",
      UserModel //or User.init({}) + extending Model
    );
  },

  createUser: (user) => {
    return this.model.create(user);
  },

  findUser: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateUser: (query, updatedValue) => {
    console.log(updatedValue);
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  deleteUser: (query) => {
    return this.model.destroy({
      where: query,
    });
  },

  findAllUsers: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
};
