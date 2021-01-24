const getDB = require("../../dbConnection");
const { savePhoto } = require("../../helpers");

const newProduct = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { location, description, price, name, category} = req.body;

        if (!location || !description || !price || !name || !category)
        {
            const error = new Error("Faltan campos");
            error.httpStatus = 400;
            throw error;
        }
        if (!req.files )
        {
            const error = new Error("Falta agregar una foto");
            error.httpStatus = 400;
            throw error;
        }
        const photo = await savePhoto(req.files.photo);
        await connection.query(
            `
            insert into product (id_user, location, price, category, name, photo, description)
            values(?,?,?,?,?,?,?)
            `,
            [req.userAuth.id, location, price, category, name, photo, description]
        )
        res.send({
            status: "ok",
            message: {
                id: req.userAuth.id,
                location,
                description,
                price,
                category,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = newProduct;