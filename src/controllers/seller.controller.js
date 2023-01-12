const {
    selectAllSeller,
    selectSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countData,
    findId,
  } = require("../models/seller.model");
  const commonHelper = require("../helper/common");
  
  const sellerController = {

    getAllSeller: async(req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        let sortBY = req.query.sortBY || "id_seller";
        let sort = req.query.sort || 'ASC';
        let searchParam = req.query.search || "";
        const result = await selectAllSeller(limit, offset, searchParam,sortBY,sort);
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


    getDetailSeller: async (req, res) => {
      const id = Number(req.params.id);
      selectSeller(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },


    createSeller: async (req, res) => {
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
      insertSeller(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Seller Added")
        )
        .catch((err) => res.send(err));
    },


    updateSeller: async (req, res) => {
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
        updateSeller(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Seller updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },


    deleteSeller: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
         return res.json({message: "ID is Not Found"})
        }
        deleteSeller(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Seller deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = sellerController;