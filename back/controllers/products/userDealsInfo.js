const getDB = require("../../dbConnection");

const userDeals = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [deals] = await connection.query(
      `
            select  *
            from deal
            where id_user = ? and accepted != 0
            `,
      [req.userAuth.id]
    );
    if (deals.length === 0) {
      const error = new Error("No tienes reservas");
      error.httpStatus = 401;
      throw error;
    }
    const ids = deals.map(function (el) {
      return el.id_product;
    });
    const [infoProduct] = await connection.query(
      `
            select * 
            from product
            where id in (?)
        `,
      [ids]
    );
    const info = deals.map(function (el) {
      const objeto = infoProduct.find(
        (element) => element.id === el.id_product
      );
      const informacion = {
        id_deal: el.id,
        foto: objeto.photo,
        name: objeto.name,
        category: objeto.category,
        description: objeto.description,
        price: objeto.price,
        location: objeto.location,
        id_product: objeto.id,
      };
      return informacion;
    });
    console.log(info);
    res.send({
      status: "ok",
      message: {
        info,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userDeals;
