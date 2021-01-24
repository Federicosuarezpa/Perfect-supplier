const getDB = require("../../dbConnection");

const { generateRandomString, sendMail } = require("../../helpers");

const recoverPass = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { email } = req.body;
        if (!email) {
            const error = new Error("Faltan campos");
            error.httpStatus = 400;
            throw error;
        }
        const [currentEmail] = await connection.query(
            `
            select id
            from user
            where email=?
            `,
            [email]
        );

        if(currentEmail.length === 0)
        {
            const error = new Error("No existe un usuario con los datos proporcionados");
            error.httpStatus = 404;
            throw error;
        }

        const recoverCode = generateRandomString(40);

        const emailBody = `
            Se solicitó un cambio de contraseña.

            El código de recuperación es: ${recoverCode}
        `;

        await connection.query(
            `
            update user
            set recoverCode=?
            where email=?
            `,
            [recoverCode, email]
        );

        await sendMail({
            to: email,
            subject: "Cambio de contraseña en f2f",
            body: emailBody,
        });

        res.send({
            status: "ok",
            message: "Email enviado",
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = recoverPass;