/**Falta por implementar todo lo de productos menos newProduct */
/**Comprobar que los votos funcionan bien BBDD */

/**Mirar el editUserInfo para que esten todos los parametros y el email que no está */

const newProduct = require("./newProduct");
const userProducts = require("./userProducts");
const pendingDeals = require("./pendingDeal");
const userDealsInfo = require("./userDealsInfo");
const modifyProduct = require("./modifyProduct");
const getProducts = require("./getProducts");
const bookProduct = require("./bookProduct");
const deleteProduct = require("./deleteProduct");
const voteProduct = require("./voteProduct");
const productInfo = require("./productInfo");
const getReview = require("./getReview");
const productRate = require("./productRate");

module.exports = {
  productInfo,
  voteProduct,
  bookProduct,
  deleteProduct,
  modifyProduct,
  userDealsInfo,
  pendingDeals,
  getProducts,
  newProduct,
  userProducts,
  getReview,
  productRate,
};
