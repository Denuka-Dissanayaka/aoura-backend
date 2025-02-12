const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
//const Networks = require("./NetworkModule.js");

const { DataTypes } = Sequelize;

const Suppliers = db.define(
  "suppliers",
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
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    loanAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    paidAmount: {
      type: DataTypes.FLOAT,

      allowNull: true,
    },
    balance: {
      type: DataTypes.FLOAT,

      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,

      allowNull: true,
    },
    bankName: {
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

module.exports = Suppliers;
