const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
//const Networks = require("./NetworkModule.js");

const { DataTypes } = Sequelize;

const Ingredients = db.define(
  "ingredients",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Networks.hasMany(Staffs);
// Staffs.belongsTo(Networks, { foreignKey: "networkId" });

module.exports = Ingredients;
