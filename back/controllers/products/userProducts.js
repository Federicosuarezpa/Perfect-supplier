const getDB = require("../../dbConnection");

const userProducts = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [products] = await connection.query(
      `
            select id, name, location, price, description,photo
            from product
            where id_user = ?
            `,
      [req.userAuth.id]
    );

    if (products.length === 0) {
      const error = new Error("No tienes productos publicados");
      error.httpStatus = 400;
      throw error;
    }

    res.send({
      status: "ok",
      message: {
        products,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userProducts;
