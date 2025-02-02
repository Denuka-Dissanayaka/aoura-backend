const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
//const Users = require("./UsersModel.js");
// const Networks = require("./NetworkModule.js");
// const Customers = require("./CustomersModule.js");
// const Products = require("./ProductModel.js");

const { DataTypes } = Sequelize;

const Cashbooks = db.define(
  "cashbooks",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        notEmpty: true,
      },
    },

    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    recordID: {
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

// Networks.hasMany(Orders);
// Orders.belongsTo(Networks, { foreignKey: "networkId" });

// Products.hasMany(Orders);
// Orders.belongsTo(Products, { foreignKey: "productId" });

// Customers.hasMany(Orders);
// Orders.belongsTo(Customers, { foreignKey: "customerId" });

module.exports = Cashbooks;
