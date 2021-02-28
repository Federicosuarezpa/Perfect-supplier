const getDB = require("../../dbConnection");
const { sendMail } = require("../../helpers");

const bookProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id_product } = req.params;
    const { price } = req.body;
    console.log(id_product);

    if (!price) {
      const error = new Error("Faltan campos");
      error.httpStatus = 401;
      throw error;
    }

    await connection.query(
      `
            insert into deal (id_user, id_product, price,accepted)
            values (?,?,?,?)
            `,
      [req.userAuth.id, id_product, price, 1]
    );

    const [user] = await connection.query(
      `
            select id_user, name
            from product
            where id = ?
            `,
      [id_product]
    );

    const [email] = await connection.query(
      `
            select email
            from user
            where id = ?
            `,
      [user[0].id_user]
    );
    const emailBody = `
        Un usuario acaba de hacer una reserva para el producto ${user[0].name}, por favor envíelo cuanto antes
        `;

    await sendMail({
      to: email[0].email,
      subject: "Nueva reserva",
      body: emailBody,
    });
    res.send({
      status: "ok",
      message: "Nueva reserva realizada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = bookProduct;
