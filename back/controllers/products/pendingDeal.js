const getDB = require("../../dbConnection");

const pendingDeals = async (req, res, next ) => {
    let connection;

    try {
        connection = await getDB();

        let [userProducts] = await connection.query(
            `
            select id
            from product
            where id_user = ?
            `,
            [req.userAuth.id]
        );
        userProducts = userProducts.map(function(el) {return el.id});
        const [pendingDeals] = await connection.query(
            `
            select *
            from deal
            where id_product in (?) and endDate > ?
            `,
            [userProducts, new Date()]
        );

        if (pendingDeals.length === 0) 
        {
            const error = new Error("No tienes reservas pendientes");
            error.httpStatus = 401;
            throw error;
        }
        res.send({
            status:"ok",
            message: {
                pendingDeals,
            }
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = pendingDeals;