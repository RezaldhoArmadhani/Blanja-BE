const {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
  } = require("../models/customer.model");
  const commonHelper = require("../helper/common");
  
  const customerController = {

    getAllCustomer: async(req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        let sortBY = req.query.sortBY || "id_customer";
        let sort = req.query.sort || 'ASC';
        let searchParam = req.query.search || "";
        const result = await selectAllCustomer(limit, offset, searchParam,sortBY,sort);
        const {
          rows: [count],
        } = await countData();
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage,
        };
        commonHelper.response(res , result.rows, 200, "get data success",pagination);
      } catch (error) {
        console.log(error);
      }
    },


    getDetailCustomer: async (req, res) => {
      const id = Number(req.params.id);
      selectCustomer(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },


    createCustomer: async (req, res) => {
      const { name, phone, password, email, gender, birth_date } = req.body;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const data = {
        id,
        name,
        phone,
        password,
        email,
        gender,
        birth_date,
      };
      insertCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Customer Added")
        )
        .catch((err) => res.send(err));
    },


    updateCustomer: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const {name, phone, password, email, gender, birth_date} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({message: "ID is Not Found"})
        }
        const data = {
          id,
          name,
          phone,
          password,
          email,
          gender,
          birth_date,
        };
        updateCustomer(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Customer updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },


    deleteCustomer: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({message: "ID is Not Found"})
        }
        deleteCustomer(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Customer deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = customerController;