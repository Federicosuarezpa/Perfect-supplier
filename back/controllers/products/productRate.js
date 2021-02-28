const getDB = require("../../dbConnection");

const getReview = async (req, res, next) => {
  let connection;

  const { id_product } = req.params;

  try {
    connection = await getDB();
    const [product] = await connection.query(
      `
            select *
            from ratingTable
            where id_product = ?
            `,
      [id_product]
    );
    console.log(product.length);
    console.log(product);
    if (product !== undefined) {
      let sum = 0;
      for (let i = 0; i < product.length; i++) {
        sum = sum + product[i].rating;
      }
      sum = sum / product.length;
      let reviews = product.length;
      res.send({
        status: "ok",
        reviews,
        sum,
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getReview;
