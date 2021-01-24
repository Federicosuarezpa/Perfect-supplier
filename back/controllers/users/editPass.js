const getDB = require("../../dbConnection");
const { validatePass } = require("../../helpers");

const editPass = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { id } = req.params;

        const { oldPassword, newPassword, confirmNewPass } = req.body;

        if (!validatePass(newPassword))
        {
            const error = new Error("Contraseña no válida");
            error.httpStatus = 409;
            throw error;
        }
        if (newPassword !== confirmNewPass)
        {
            const error = new Error("Las contraseñas no coinciden");
            error.httpStatus = 409;
            throw error;
        }
        if (req.userAuth.id !== Number(id)) {
            const error = new Error("No tienes permiso para modificar la contraseña");
            error.httpStatus = 408;
            throw error;
        }
        const [current] = await connection.query(
            `
            select id
            from user
            where id=? and password=SHA2(?, 512)
            `,
            [id, oldPassword]
        );
        if (current.lenght === 0) {
            const error = new Error("La contraseña antigua no coincide con la anterior contraseña");
            error.httpStatus = 401;
            throw error;
        }
        await connection.query(
            `
            update user
            set password=SHA2(?, 512), lastAuthUpdate=?
            where id=?
            `,
            [newPassword, new Date(), id]
        );

        res.send({
            status: "ok",
            message: "Contraseña cambiada",
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editPass;