require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const {
  newProduct,
  userProducts,
  userDealsInfo,
  pendingDeals,
  bookProduct,
  deleteProduct,
  getProducts,
  modifyProduct,
  voteProduct,
} = require("./controllers/products");
const {
  resetPass,
  recoverPass,
  editPass,
  editUserInfo,
  getUserInfo,
  login,
  newUser,
  deleteUser,
  validateUser,
} = require("./controllers/users");

const isUser = require("./middlewares/isUser");
const userExists = require("./middlewares/userExists");

const { PORT } = process.env;
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(fileUpload());

app.use(express.static(path.join(__dirname, "static")));

app.get("/user/validate/:registrationCode",validateUser);

app.post("/registro", newUser);

app.post("/login/recover-pass", recoverPass);

app.post("/login/modify-pass", resetPass);

app.post("/login", login);

app.delete("/profile/:id/info",isUser, userExists, deleteUser)

app.get("/profile/:id/info",isUser, userExists, getUserInfo);

app.put("/profile/:id/info",isUser, userExists, editUserInfo);

app.put("/profile/:id/info/password",isUser, userExists, editPass);

app.post("/profile/:id/newProduct", isUser, userExists, newProduct);

app.get("/profile/:id/products",isUser, userExists, userProducts);

app.get("/profile/:id/pendingDeals",isUser, userExists, pendingDeals);
/**Pensar como hacer para la parte de aceptar los pedidos que estén en null */
app.get("/profile/:id/deals",isUser,userExists,userDealsInfo);

app.post("/user/:id/all/:id_product/book", isUser,userExists,bookProduct);

app.get("/user/:id/all",isUser,userExists,getProducts);

app.get("/user/:id/all/:id_product",isUser,userExists,getProducts);

app.get("/all");

app.get("/all/:id");




app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
      status: "error",
      message: error.message,
    });
  });
  
app.use((req, res) => {
    res.status(404).send({
      status: "error",
      message: "Not found",
    });
  });
  
app.listen(PORT, () =>
{
    console.log(`Servido activo en http://localhost:${PORT}`);
})