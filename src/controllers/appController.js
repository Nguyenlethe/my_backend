import appServices from "../services/appServices";
import _ from "lodash";

// Login
const loginSystem = async (req, res) => {
  try {
    let data = req.body;
    let ress = await appServices.loginSystem(data);
    return res.status(200).json(ress);
  } catch (e) {
    return res.status(200).json(e);
  }
};

// Quên Password (Check Email & Send Email)
const forgotPassword = async (req, res) => {
  try {
    let data = req.body;
    let ress = await appServices.forgotPassword(data);
    return res.status(200).json(ress);
  } catch (e) {
    return res.status(200).json(e);
  }
};

// Update lại mật khẩu
const updatePassword = async (req, res) => {
  try {
    let data = req.body;
    let ress = await appServices.updatePassword(data);
    return res.status(200).json(ress);
  } catch (e) {
    return res.status(200).json(e);
  }
};

// Update lại mật khẩu
const createNewUser = async (req, res) => {
  try {
    let data = req.body;
    let ress = await appServices.createNewUser(data);
    return res.status(200).json(ress);
  } catch (e) {
    return res.status(200).json(e);
  }
};

// idshop value
const searchItemsNameNav = async (req, res) => {
  try {
    let dataClient = req.query;
    let data = await appServices.searchItemsNameNav(dataClient);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json(e);
  }
};

//
const getLikeOrFollowItemsShop = async (req, res) => {
  try {
    let dataClient = req.query;
    let data = await appServices.getLikeOrFollowItemsShop(dataClient);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json(e);
  }
};

// delete voucher Expired
const deleteVoucherExpired = async (req, res) => {
  try {
    let data = await appServices.deleteVoucherExpired();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json(e);
  }
};

// // add items to cart
const addNewItemsToCart = async (req, res) => {
  try {
    let dataClient = req.body;
    let data = await appServices.addNewItemsToCart(dataClient);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json(e);
  }
};

// get list cart items
const getListCart = async (req, res) => {
  try {
    let dataClient = req.query.idUser;
    let data = await appServices.getListCart(dataClient);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json(e);
  }
};

export default {
  getListCart,
  addNewItemsToCart,
  deleteVoucherExpired,
  getLikeOrFollowItemsShop,
  searchItemsNameNav,
  createNewUser,
  updatePassword,
  loginSystem,
  forgotPassword,
};
