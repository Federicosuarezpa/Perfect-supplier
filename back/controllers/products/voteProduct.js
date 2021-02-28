const getDB = require("../../dbConnection");

const voteProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { puntuation, review } = req.body;
    const { id_deal } = req.params;
    const [values] = await connection.query(
      `
            select id_user, id_product
            from deal
            where id = ?
            `,
      [id_deal]
    );
    console.log(values[0].id_user);

    const [checkVoted] = await connection.query(
      `
            select id
            from ratingTable
            where id_deal=?
            `,
      [id_deal]
    );
    console.log(checkVoted[0]);
    if (checkVoted[0] !== undefined) {
      const error = new Error("Ya has votado esta entrada");
      error.httpStatus = 401;
      throw error;
    } else if (!review) {
      const error = new Error("Falta por poner una review");
      error.httpStatus = 401;
      throw error;
    } else if (!puntuation || puntuation > 5 || puntuation < 1) {
      const error = new Error("Falta la puntuación o el valor es incorrecto");
      error.httpStatus = 401;
      throw error;
    } else {
      /**Falta comprobar que el usuario tenga permiso, que coincida id_user con id falta coger id_deal y falta comprobar que no se haya votado ya */

      await connection.query(
        `
            insert into ratingTable (id_deal, id_product, rating, rated)
            values (?, ?, ?, ?)
            `,
        [id_deal, values[0].id_product, puntuation, true]
      );
      res.send({
        status: "ok",
        message: "Producto valorado",
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = voteProduct;
