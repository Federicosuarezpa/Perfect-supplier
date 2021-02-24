const getDB = require("../../dbConnection");

const userProducts = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    /**Falta agregar filtrados*/
    const { id_product } = req.params;
    console.log(id_product);
    const [products] = await connection.query(
      `
            select id, name, price, photo, location, description,category
            from product
            where id=?
            `,
      [id_product]
    );
    res.send({
      status: "ok",
      message: products,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userProducts;
