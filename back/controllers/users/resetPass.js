const getDB = require("../../dbConnection");
const { validatePass } = require("../../helpers");

const resetPass = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { recoverCode, newPassword, confirmPass } = req.body;
    console.log(recoverCode, newPassword, confirmPass);
    if (!recoverCode || !newPassword || !confirmPass) {
      const error = new Error("Faltan campos por rellenar");
      error.httpStatus = 400;
      throw error;
    }

    if (!validatePass(newPassword)) {
      const error = new Error("La contraseña no es válida");
      error.httpStatus = 401;
      throw error;
    }

    if (newPassword !== confirmPass) {
      const error = new Error("Las contraseñas no coinciden");
      error.httpStatus = 401;
      throw error;
    }

    const [user] = await connection.query(
      `
            select id
            from user
            where recoverCode=?
            `,
      [recoverCode]
    );

    if (user.length === 0) {
      const error = new Error("Código de recuperación incorrecto");
      error.httpStatus = 404;
      throw error;
    }

    await connection.query(
      `
            update user
            set password=SHA2(?, 512), lastAuthUpdate=?, recoverCode=NULL
            where id=?
            `,
      [newPassword, new Date(), user[0].id]
    );

    res.send({
      status: "ok",
      message: "password del usuario cambiada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = resetPass;
