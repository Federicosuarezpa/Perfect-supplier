const { differenceInMinutes } = require("date-fns");
const jwt = require("jsonwebtoken");
const { isNumber } = require("lodash");
const getDB = require("../../dbConnection");

const login = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { email, password } = req.body;

        if (!email || !password ) {
            const error = new Error("Faltan campos por rellenar");
            error.httpStatus = 400;
            throw error;
        }
        const [user] = await connection.query(
            `
            select id, date, active
            from user
            where email=? and password=SHA2(?, 512)
            `,
            [email, password]
        );
        if( user.length === 0 ) {
            let error;
            const [trys] = await connection.query(
                `
                select id, numberTrys, timeFirstFail
                from user
                where email=?
                `,
                [email]
            );

            if (trys[0].numberTrys === 3)
            {
                await connection.query (
                    `
                    update user
                    set numberTrys = numberTrys - 1, timeFirstFail = ?
                    where email=?
                    `,
                    [new Date(), email]
                );
                error =  new Error("La contraseña o el email son incorrectos, te quedan 2 intentos");
            } else if (trys[0].numberTrys === 0)
            {
                if(differenceInMinutes(new Date(),trys[0].timeFirstFail ) > 10)
                {
                   await connection.query( `
                    update user
                    set numberTrys = 3 , timeFirstFail = null
                    where email=?
                    `,
                    [email]
                   );
                    error = new Error("La contraseña o el email son incorrectos, te quedan 3 intentos");
                } else {
                    error = new Error(`Se ha quedado sin intentos, vuelva a intentarlo en ${10 - differenceInMinutes(new Date(), trys[0].timeFirstFail)} minutos `);
                }
            } else {
                await connection.query (
                    `
                    update user
                    set numberTrys = numberTrys - 1
                    where email=?
                    `,
                    [email]
                );
                error = new Error(`Contraseña o email incorrectos, te quedan ${trys[0].numberTrys - 1 } intentos`);
            }
            error.httpStatus = 401;
            throw error;
        }

        if (!user[0].active) {
            const error = new Error ("El usuario está pendiente de activar su cuenta. Compruebe su email por favor.");
            error.httpStatus = 401;
            throw error;
        }

        const info = {
            id: user[0].id,
            date: user[0].date,
        };

        const token = jwt.sign(info, process.env.SECRET, {
            expiresIn: "10d",
        });

        res.send({
            status: "ok",
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = login;