const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Networks = require("./NetworkModule.js");

const { DataTypes } = Sequelize;

const Staffs = db.define(
  "staffs",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fristname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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

Networks.hasMany(Staffs);
Staffs.belongsTo(Networks, { foreignKey: "networkId" });

module.exports = Staffs;
