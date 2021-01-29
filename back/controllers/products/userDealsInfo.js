const getDB = require("../../dbConnection");

const userDeals = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const [deals] = await connection.query(
            `
            select  *
            from deal
            where id_user = ? and accepted != 0
            `,
            [req.userAuth.id]
        );
        if(deals.length === 0)
        {
            const error = new Error("No tienes reservas");
            error.httpStatus = 401;
            throw error;
        }

        res.send({
            status:"ok",
            message: {
                deals
            }
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = userDeals;