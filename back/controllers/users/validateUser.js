const getDB = require("../../dbConnection");

const validateUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { registrationCode } = req.params;

    const [user] = await connection.query(
      `
            select id
            from user
            where registrationCode=?
            `,
      [registrationCode]
    );
    console.log(user.lenght);
    if (user.lenght === undefined) {
      const error = new Error(
        "No existe ningún usuario con ese código por validar"
      );
      error.httpStatus = 404;
      throw error;
    }
    await connection.query(
      `
            update user
            set active=1, registrationCode=NULL
            where registrationCode=?
            `,
      [registrationCode]
    );
    res.send({
      status: "ok",
      message: "Usuario validado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = validateUser;
