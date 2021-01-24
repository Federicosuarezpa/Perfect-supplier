const getDB = require("../../dbConnection");
const { savePhoto, validatePass, validateUserName, validateEmail, generateRandomString, sendMail } = require("../../helpers");

const newUser = async (req, res, next) => {
    let connection;

    try {
        
        connection = await getDB();

        const { name, email, password, confirmPassword, bio } = req.body;
        console.log(req.body.name);
        if(password !== confirmPassword)
        {
            const error = new Error("Las contraseñas no coinciden");
            error.httpStatus = 409;
            throw error;
        }
        if (!validateEmail(email))
        {
            const error = new Error("Email incorrecto");
            error.httpStatus = 409;
            throw error;
        }
        if (!validateUserName(name))
        {
            const error = new Error("Nombre no válido");
            error.httpStatus = 409;
            throw error;
        }
        if (!validatePass(password))
        {
            const error = new Error("Contraseña no válida");
            error.httpStatus = 409;
            throw error;
        }
        let savedPhoto;

        /**Mirar como pasar foto postman */
        if(req.files && req.files.photo) {
            savedPhoto = await savePhoto(req.files.photo);
            console.log("awidj");
        }
        const [existingUser] = await connection.query(
            `select id 
            from user
            where email = ?
            `,
            [email]
        );

        if (existingUser.lenght > 0) {
            const error = new Error("Ya hay un usuario registrado con ese email correo");
            error.httpStatus = 409;
            throw error;
        }
        const registrationCode = generateRandomString(40);

        const emailBody = 
        `Te acabas de registrar en nombrepordeterminar.
        Pulsa en este link para validar tu email: ${process.env.PUBLIC_HOST}/user/validate/${registrationCode}`;

        await sendMail ({
            to: email,
            subject: "Activa tu usuario de nuestra página",
            body: emailBody,

        });
        await connection.query (
            `
            insert into user (name, email, password, bio, registrationCode, photo, date)
            values(?,?,SHA2(?,512),?,?,?,?)
            `,
            [name, email, password, bio, registrationCode, savedPhoto, new Date()]
        );
        res.send({
            status: "ok",
            message: "Usuario dado de alta en la base de datos",
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUser;