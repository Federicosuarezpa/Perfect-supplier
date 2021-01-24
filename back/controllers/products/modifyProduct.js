const getDB = require("../../dbConnection");
const { savePhoto } = require("../../helpers");

const modifyProduct = async (req, res, next) => {
    let connection;

    try {
        connection = getDB();
        
        const { location, description, price, name, category} = req.body;

        const { id } = req.params;

        if (!location || !description || !price || !name || !category )
        {
            const error = new Error("Faltan campos");
            error.httpStatus = 400;
            throw error;
        }

        if (Object.keys(req.files).length === 0 || !req.files )
        {
            const error = new Error("Falta agregar una foto");
            error.httpStatus = 400;
            throw error;
        }
        const photo = await savePhoto(req.files.photo);
        await connection.query(
            `
            update product
            set location = ? and description = ? and price = ? and name = ? and category = ?
            where id = ?
            `,
            [location,description,price,name,category,id]
        );

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = modifyProduct;