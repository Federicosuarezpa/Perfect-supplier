const getDB = require("../../dbConnection");

const userProducts = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        /**Falta agregar filtrados y recomendaciones personalizadas usuarios, implementar mas adelante */
        const [products] = connection.query (
            `
            select id, location, price, description, startDate, endDate
            from product
            group by id
            `
        );
        res.send({
            status: "Ok",
            message: products,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = userProducts;