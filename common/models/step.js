const { DataTypes, HasMany, BelongsTo } = require("sequelize"); // Import the built-in data types
const PlanModel = require("./plan");

const StepModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanModel,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("step", StepModel);
  },

  createStep: (step) => {
    return this.model.create(step);
  },

  findStep: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateStep: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  deleteStep: (query) => {
    return this.model.destroy({
      where: query,
    });
  },

  findAllSteps: (query) => {
    return this.model.findAll({
      where: query,
    });
  },
};
