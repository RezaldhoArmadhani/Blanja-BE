/* eslint-disable no-unused-vars */
const bcrypt = require("bcryptjs");
const modelUsers = require("../models/userr.model");
const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const jwt = require("jsonwebtoken");

const userrController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [userr],
      } = await modelUsers.findEmail(email);
      if (!userr) {
        return res.json({
          Message: " Email is invalid",
        });
      }
      const isValidPassword = bcrypt.compareSync(password, userr.password);
      if (!isValidPassword) {
        return res.json({
          Message: " Password is invalid",
        });
      }
      delete userr.password;
      let payload = {
        email: userr.email,
        role: userr.role,
      };

      userr.token = authHelper.generateToken(payload);
      userr.refreshToken = authHelper.generateRefreshToken(payload);
      commonHelper.response(res, userr, 201, "login is successful");
    } catch (error) {
      console.log(error);
    }
  },
  register: async (req, res) => {
    try {
      const { email, password, fullname } = req.body;
      const { rowCount } = await modelUsers.findEmail(email);
      if (rowCount) {
        return res.json({
          Message: "Email is already used",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const id = uuidv4();
      let data = {
        id_user,
        email,
        fullname,
        password: passwordHash,
        role: "user",
      };
      modelUsers
        .createUser(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Register success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT);
    let payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
  profile: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [userr],
    } = await modelUsers.findEmail(email);
    delete userr.password;
    commonHelper.response(res, userr, 200);
  },
};

module.exports = userrController;
