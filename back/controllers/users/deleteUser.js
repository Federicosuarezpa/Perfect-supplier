const getDB = require("../../dbConnection");

const { generateRandomString } = require("../../helpers");

const deleteUser = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { id } = req.params;

        if (req.userAuth.id !== Number(id)) {
            const error = new Error (
                "No tienes permisos para anonimizar este usuario"
            );
            error.httpStatus = 401;
            throw error;
        }
        let [products] = await connection.query(
            `
            select id 
            from product
            where id_user = ?
            `,
            [id]
        );
        products = products.map(function(f) { return f.id });

        const [productosPendientes] = await connection.query(
            `
            select * from deal
            where id_product in (?) and completed = 0 and accepted = 1
            `,
            [products]
        );
        
        if (Object.keys(productosPendientes).length) {
            const error = new Error("Aún tienes reservas pendientes, no puedes eliminar tu usuario");
            error.httpStatus = 400;
            throw error;
        }
        
        await connection.query(
            `
            update user
            set password=?, name="[borrado]", photo=NULL, active=0, deleted=1, lastAuthUpdate=?
            where id=?
            `,
            [generateRandomString(40), new Date(), id]
        );

        await connection.query (
            `
            delete
            from ratingTable
            where id_product in (?)
            `,
            [products]
        );
        
        await connection.query(
            `
            delete
            from product
            where id_user = ?
            `,
            [id]
        );
        res.send({
            status:"ok",
            message: `El usuario con id: ${id} fue anonimizado`
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = deleteUser;