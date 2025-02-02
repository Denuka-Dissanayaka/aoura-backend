const Cashbooks = require("../models/CashbookModule");

const getCashbookRecords = async (req, res) => {
  try {
    let response;

    if (req.role === "admin") {
      response = await Cashbooks.findAll({
        attributes: ["id", "uuid", "description", "date", "type", "recordID"],
      });
    }
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCashbookRecords,
};
