const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
//const Users = require("./UsersModel.js");
const Networks = require("./NetworkModule.js");

const { DataTypes } = Sequelize;

const Customers = db.define(
  "customers",
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
        len: [3, 200],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // validate: {
      //   min: 10,
      //   max: 11,
      // },
    },

    networkId: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    loanAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    paidloanAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isChequePayment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ChequeBalance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ChequeGivenDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ChequeDueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    bankDeposit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    depositAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Users.hasMany(Products);
// Products.belongsTo(Users, { foreignKey: "userId" });

Networks.hasMany(Customers);
Customers.belongsTo(Networks, { foreignKey: "networkId" });

module.exports = Customers;
