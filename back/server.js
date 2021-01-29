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

/*Path para validación de usuario mediante código de registro proporcionado automáticamente*/
app.get("/user/validate/:registrationCode",validateUser);
/*Path para el registro de un nuevo usuario, teniendo en cuenta que no sea una entrada duplicada de correo, las contraseñas sigan unos parametros, el email cumpla la rfc 5322 https://tools.ietf.org/html/rfc5322 */
app.post("/registro", newUser);
/*Path para la recuperación de la contraseña por parte del usuario*/
app.post("/login/recover-pass", recoverPass);
/*Path para modificar la contraseña, siempre teniendo en cuenta que siga unos parámetros, 1 mayúscula, 1 minúscula, 1 carácter especial, 1 número y 8 carácteres mínimo*/
app.post("/login/modify-pass", resetPass);
/*Path de login del usuario*/
app.post("/login", login);
/*Información sobre el usuario* */
app.get("/profile/:id/info",isUser, userExists, getUserInfo);
/*Eliminación del usuario, solo permitido por el usuario propio*/
app.delete("/profile/:id/info",isUser, userExists, deleteUser)
/*Cambio de información del usuario, nombre, email, etc. */
app.put("/profile/:id/info",isUser, userExists, editUserInfo);
/*Cambio de la contraseña del usuario, siguiendo los parámetros especificados arriba* */
app.put("/profile/:id/info/password",isUser, userExists, editPass);
/*Publicación de un nuevo producto, solo posible por usuario registrado y logueado* */
app.post("/profile/:id/newProduct", isUser, userExists, newProduct);
/*Información de los productos existentes publicados por parte del usuario* */
app.get("/profile/:id/products",isUser, userExists, userProducts);
/**Reservas pendientes de ser servidas */
app.get("/profile/:id/pendingDeals",isUser, userExists, pendingDeals);
/**Reservas pendientes de ser servidas por parte del proveedor, se le muestran al cliente cuales tiene pendientes*/
/**Pensar como hacer para la parte de aceptar los pedidos que estén en null */
app.get("/profile/:id/deals",isUser,userExists,userDealsInfo);
/**Realizar una reserva por parte del usuario */
app.post("/user/:id/all/:id_product/book", isUser,userExists,bookProduct);
/** */
app.get("/user/:id/all",isUser,userExists,getProducts);
/** */
app.get("/user/:id/all/:id_product",isUser,userExists,getProducts);
/**Ver todos los productos con filtros y recomendaciones*/
app.get("/all",getProducts);
/**Falta agregar apartado de voto, eliminar reserva, etc */
/**Filtros y recomendaciones y middlewares de que el producto exista, en una tarde se hace */




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