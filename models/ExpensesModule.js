const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const Networks = require("./NetworkModule.js");

const { DataTypes } = Sequelize;

const Expenses = db.define(
  "expenses",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        notEmpty: true,
      },
    },

    value: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    networkId: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Networks.hasMany(Expenses);
Expenses.belongsTo(Networks, { foreignKey: "networkId" });

module.exports = Expenses;
