const Ingredients = require("../models/IngredientsModule");
const Networks = require("../models/NetworkModule");
const { Op } = require("sequelize");

const getIngredients = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;
  const offset = limit * page;
  try {
    let totalRows;
    let totalPage;
    totalRows = await Ingredients.count();
    totalPage = Math.ceil(totalRows / limit);

    const response = await Ingredients.findAll({
      attributes: ["id", "uuid", "name", "quantity", "status"],

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

const getIngredientById = async (req, res) => {
  try {
    const response = await Ingredients.findOne({
      attributes: ["id", "uuid", "name", "quantity", "status", "createdAt"],

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

const createIngredient = async (req, res) => {
  const { name, quantity, status } = req.body;

  try {
    await Ingredients.create({
      name,
      quantity,
      status,
    });
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateIngredient = async (req, res) => {
  const ingredient = await Ingredients.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!ingredient) return res.status(404).json({ msg: "Supplier not found" });
  const { name, quantity, status } = req.body;

  try {
    await Ingredients.update(
      {
        name,
        quantity,
        status,
      },
      {
        where: {
          id: ingredient.id,
        },
      }
    );
    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteIngredient = async (req, res) => {
  const ingredient = await Ingredients.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!ingredient) return res.status(404).json({ msg: "User not found" });
  try {
    await Ingredients.destroy({
      where: {
        id: ingredient.id,
      },
    });
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
