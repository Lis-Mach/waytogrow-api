const { DataTypes, HasMany, BelongsTo } = require("sequelize");
const StepModel = require("./step");
const UserModel = require("./user");

const PlanModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("plan", PlanModel);
  },

  createPlan: (plan) => {
    return this.model.create(plan);
  },

  findPlan: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updatePlan: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },
  deletePlan: (query) => {
    return this.model.destroy({
      where: query,
    });
  },

findAllPlans: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
};
