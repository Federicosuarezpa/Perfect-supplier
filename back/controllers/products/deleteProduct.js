const getDB = require("../../dbConnection");
const { deletePhoto } = require("../../helpers");
/**Mirar como borrar foto */

const deleteProduct = async (req, res, next) => {
    let connection;

    try {
        connection = getDB();

        const { id } = req.params;

        const [info] = await connection.query (
            `
            select id, photo
            from product
            where id=?
            `,
            [id]
        );

        if (info.lenght === 0) {
            const error = new Error("No existe la entrada");
            error.httpStatus = 400;
            throw error;
        }

        const [reservas] = await connection.query (
            `
            select id
            from deal
            where id_product = ? and endDate > ?
            `,
            [id, new Date()]
        );

        if (reservas.lenght > 0)
        {
            const error = new Error("Por favor, le quedan reservas pendientes de servir, no puede eliminar el producto aún");
            error.httpStatus = 400;
            throw error;
        }

        await deletePhoto(info.photo);

        await connection.query (
            `
            delete
            from product
            where id = ?
            `,
            [id]
        );
        res.send({
            status:"ok",
            message:"El producto ha sido eliminado con éxito",
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = deleteProduct;