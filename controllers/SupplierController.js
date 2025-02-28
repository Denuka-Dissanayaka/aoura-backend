const Suppliers = require("../models/SupplierModule");
const Networks = require("../models/NetworkModule");
const { Op } = require("sequelize");

const getSuppliers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;
  const offset = limit * page;
  try {
    let totalRows;
    let totalPage;
    totalRows = await Suppliers.count();
    totalPage = Math.ceil(totalRows / limit);

    const response = await Suppliers.findAll({
      attributes: [
        "id",
        "uuid",
        "name",
        "email",
        "productName",
        "productPrice",
        "loanAmount",
        "paidAmount",
        "balance",
        "paymentMethod",
        "bankName",
      ],

      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });
    res.status(200).json({
      response,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// const getStaffsCount = async (req, res) => {
//   let response;
//   if (req.role === "admin") {
//     response = await Staffs.count();
//   } else {
//     response = 0;
//   }
//   res.status(200).json({
//     response,
//   });
// };

const getSupplierById = async (req, res) => {
  try {
    const response = await Suppliers.findOne({
      attributes: [
        "id",
        "uuid",
        "name",
        "email",
        "productName",
        "productPrice",
        "loanAmount",
        "paidAmount",
        "balance",
        "paymentMethod",
        "bankName",
        "createdAt",
      ],

      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// const getStaffsBasedOnNetwork = async (req, res) => {
//   const page = parseInt(req.query.page) || 0;
//   const limit = parseInt(req.query.limit) || 8;
//   const searchByName = req.query.search_by_name || "";
//   const offset = limit * page;
//   try {
//     let totalRows;
//     let totalPage;
//     totalRows = await Staffs.count({
//       where: {
//         [Op.and]: [
//           {
//             fristname: {
//               [Op.like]: "%" + searchByName + "%",
//             },
//           },
//           {
//             networkId: req.params.networkId,
//           },
//         ],
//         //networkId: req.params.networkId,
//       },
//     });
//     totalPage = Math.ceil(totalRows / limit);

//     const response = await Staffs.findAll({
//       attributes: [
//         "id",
//         "uuid",
//         "fristname",
//         "lastname",
//         "gender",
//         "networkId",
//         "nic",
//       ],
//       where: {
//         [Op.and]: [
//           {
//             fristname: {
//               [Op.like]: "%" + searchByName + "%",
//             },
//           },
//           {
//             networkId: req.params.networkId,
//           },
//         ],
//         //networkId: req.params.networkId,
//       },
//       include: [
//         {
//           model: Networks,
//           attributes: ["uuid", "name"],
//         },
//       ],
//       offset: offset,
//       limit: limit,
//       order: [["id", "DESC"]],
//     });
//     res.status(200).json({
//       response,
//       page: page,
//       limit: limit,
//       totalRows: totalRows,
//       totalPage: totalPage,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

const createSupplier = async (req, res) => {
  const {
    name,
    email,
    productName,
    productPrice,
    loanAmount,
    paidAmount,
    balance,
    paymentMethod,
    bankName,
  } = req.body;

  try {
    await Suppliers.create({
      name,
      email,
      productName,
      productPrice,
      loanAmount,
      paidAmount,
      balance,
      paymentMethod,
      bankName,
    });
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateSupplier = async (req, res) => {
  const supplier = await Suppliers.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!supplier) return res.status(404).json({ msg: "Supplier not found" });
  const {
    name,
    email,
    productName,
    productPrice,
    loanAmount,
    paidAmount,
    balance,
    paymentMethod,
    bankName,
  } = req.body;

  try {
    await Suppliers.update(
      {
        name,
        email,
        productName,
        productPrice,
        loanAmount,
        paidAmount,
        balance,
        paymentMethod,
        bankName,
      },
      {
        where: {
          id: supplier.id,
        },
      }
    );
    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  const user = await Suppliers.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await Suppliers.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
