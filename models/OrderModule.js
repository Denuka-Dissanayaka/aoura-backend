const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
//const Users = require("./UsersModel.js");
const Networks = require("./NetworkModule.js");
const Customers = require("./CustomersModule.js");
const Products = require("./ProductModel.js");

const { DataTypes } = Sequelize;

const Orders = db.define(
  "orders",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
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

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    price: {
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
    productId: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    customerId: {
      type: DataTypes.INTEGER,

      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    tempCustomerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tempCustomerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tempCustomerPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Users.hasMany(Products);
// Products.belongsTo(Users, { foreignKey: "userId" });

Networks.hasMany(Orders);
Orders.belongsTo(Networks, { foreignKey: "networkId" });

Products.hasMany(Orders);
Orders.belongsTo(Products, { foreignKey: "productId" });

Customers.hasMany(Orders);
Orders.belongsTo(Customers, { foreignKey: "customerId" });

module.exports = Orders;
