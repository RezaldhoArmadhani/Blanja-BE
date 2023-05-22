const {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findId,
} = require("../models/product.model");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const { uploadPhotoCloudinary } = require("../../cloudinary");

const productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;
      let sortBY = req.query.sortBY || "name";
      let sort = req.query.sort || "ASC";
      let searchParam = req.query.search || "";
      const result = await selectAllProduct(
        limit,
        offset,
        searchParam,
        sortBY,
        sort
      );
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
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getDetailProduct: async (req, res) => {
    const id = req.params.id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" });
    }
    selectProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  createProduct: async (req, res) => {
    // ---------------
    // const photo = req.file.filename;
    // console.log(photo);
    // const PORT = process.env.PORT || 5000;
    // const DB_HOST = process.env.HOST || "localhost";
    const role = req.payload.role;

    if (role !== "seller")
      return commonHelper.response(res, null, 401, "Permission Denied");
    // ---------------
    const {
      name,
      price,
      description,
      stock,
      rating,
      color,
      size,
      id_category,
      id_seller,
    } = req.body;
    // ---------------
    // console.log(photo,name, price, description, stock, rating,color,size, id_category, id_seller);
    const id = uuidv4();
    let data = {
      // id_product,
      name,
      price,
      description,
      stock,
      rating,
      color,
      size,
      id_category,
      id_seller,
    };

    console.log(data);

    // console.log(req.file);

    if (req.file) {
      const upload = await uploadPhotoCloudinary(req.file.path);
      data.photo = upload.secure_url || url;
      console.log(data.photo);
    } else {
      data.photo = oldData.photo;
      console.log(data.photo);
    }

    console.log(data);

    insertProduct(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Product created");
      })
      .catch((err) => {
        res.send(err);
      });
  },

  updateProduct: async (req, res) => {
    const id = req.params.id;
    // const photo = req.file.filename;
    // console.log(photo);
    // const PORT = process.env.PORT || 5000;
    // const DB_HOST = process.env.HOST || "localhost";
    const role = req.payload.role;
    console.log(req.payload);
    const id_seller = req.payload.id;
    // console.log(role);

    const oldDataResult = await selectProduct(id);
    const oldData = oldDataResult.rows[0];
    console.log(oldData);

    if (role !== "seller")
      return commonHelper.response(res, null, 401, "Permission Denied");
    // const {name, price, description, stock, rating ,color, size, id_category, id_seller} = req.body;
    const { rowCount } = await findId(id);
    if (!rowCount) return res.json({ message: "ID is Not Found" });
    const {
      name,
      stock,
      price,
      description,
      id_category,
      rating,
      size,
      color,
    } = req.body;
    const data = {
      id,
      name,
      price,
      description,
      stock,
      rating,
      color,
      size,
      // photo: `http://${DB_HOST}:${PORT}/img/${photo}`,
      id_category,
      id_seller,
    };

    console.log(data);

    // console.log(req.file);

    if (req.file) {
      const upload = await uploadPhotoCloudinary(req.file.path);
      data.photo = upload.secure_url || url;
      console.log(data.photo);
    } else {
      data.photo = oldData.photo;
      console.log(data.photo);
    }

    console.log(data);

    updateProduct(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Product updated");
      })
      .catch((err) => {
        res.send(err);
      });
  },

  deleteProduct: async (req, res) => {
    const id = req.params.id;
    const role = req.payload.role;
    console.log(req.payload);
    if (role !== "seller")
      return commonHelper.response(res, null, 401, "Permission Denied");
    const { rowCount } = await findId(id);
    if (!rowCount) return res.json({ message: "ID is Not Found" });

    deleteProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Product deleted");
      })
      .catch((err) => {
        res.send(err);
      });
  },
};

module.exports = productController;

// controller : const sortby = req.query.sortby || name;
// const sort = req.query.sort.toUpperCase() || 'ASC';

// model : `SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`

// email,
// fullname,
// password: passwordHash,
// role: "user",
// };
// ---------------
// const {
//   rows: [count],
// } = await countData();
// const id = Number(count.count) + 1;

// const data = {
//   id,
//   name,
//   price,
//   description,
//   stock,
//   rating,
//   color,
//   size,
//   id_category,
//   id_seller,
// };
