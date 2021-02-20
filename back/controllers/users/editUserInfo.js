const { get } = require("lodash");
const getDB = require("../../dbConnection");

const {
  savePhoto,
  generateRandomString,
  sendMail,
  validateUserName,
  validateEmail,
} = require("../../helpers");

const editUserInfo = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const { name, email, bio } = req.body;

    if (req.userAuth.id !== Number(id)) {
      const error = new Error("no tienes permisos para editar este usuario");
      error.httpStatus = 403;
      throw error;
    }
    if (!validateEmail(email)) {
      const error = new Error("Email incorrecto");
      error.httpStatus = 409;
      throw error;
    }
    if (!validateUserName(name)) {
      const error = new Error("Nombre no válido");
      error.httpStatus = 409;
      throw error;
    }
    const [currentUser] = await connection.query(
      `
            select email
            from user
            where id=?
            `,
      [id]
    );

    if (req.files && req.files.photo) {
      /**Falta eliminar foto antigua en caso de que haya, cogerla de la bbdd y eliminarla */
      const userAvatar = await savePhoto(req.files.photo);

      await connection.query(
        `
                update user
                set photo=?
                where id=?
                `,
        [userAvatar, id]
      );
    }
    if (email && email !== currentUser[0].email) {
      const [existingEmail] = await connection.query(
        `
                select id 
                from user
                where email=?
                `,
        [email]
      );
      if (existingEmail.lenght > 0) {
        const error = new Error("Ese correo ya existe en la base de datos");
        error.httpStatus = 409;
        throw error;
      }
      const registrationCode = generateRandomString(40);

      const emailBody = `
            Acabas de modificar tu email en la app de Diario de Viajes. 
            Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}/user/validate/${registrationCode}
            `;

      await connection.query(
        `
                UPDATE user
                SET name=?, email=?, lastAuthUpdate=?, active=0, registrationCode=?, bio = ?
                WHERE id=?
              `,
        [name, email, new Date(), registrationCode, bio, id]
      );

      res.send({
        status: "ok",
        message:
          "Datos de usuario actualizados. Mira tu email para validar la nueva dirección",
      });
    }
    await connection.query(
      `
            update user
            set name=?, bio = ?
            where id=?
            `,
      [name, bio, id]
    );
    res.send({
      status: "ok",
      message: "datos de usuario actualizados",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserInfo;
