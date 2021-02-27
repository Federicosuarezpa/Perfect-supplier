const getDB = require("../../dbConnection");

const userProducts = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const [products] = await connection.query(
      `
            select id, name, price,photo,location,category,id_user
            from product
            group by id
            `
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
