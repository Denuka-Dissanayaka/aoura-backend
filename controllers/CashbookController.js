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

const createCashbookRecords = async (req, res) => {
  const { description, date, type, recordID } = req.body;

  try {
    let response;

    if (req.role === "admin") {
      response = await Cashbooks.create({
        description,
        date,
        type,
        recordID,
      });
    }
    res.status(201).json({
      msg: "Record Created Successfuly",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCashbookRecords,
  createCashbookRecords,
};
