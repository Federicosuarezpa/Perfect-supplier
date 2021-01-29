const getDB = require("../../dbConnection");

const voteProduct = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { puntuation, review } = req.body;
        const { id_deal } = req.params;
        
        const [values] = connection.query(
            `
            select id_user, id_product
            from deal
            where id = ?
            `,
            [id_deal]
        );
            
        if ( req.userAuth.id !== values[0].id_user )
        {
            const error = new Error("No tienes permisos para votar dicha entrada");
            error.httpStatus = 400;
            throw error;
        }
        const [checkVoted] = connection.query (
            `
            select id
            from ratingTable
            where id_deal=?
            `,
            [id_deal]
        );
                
        if (checkVoted.lenght > 0) {
            const error = new Error("Ya has votado esta entrada");
            error.httpStatus = 401;
            throw error;
        }
        if (!review)
        {
            const error = new Error("Falta por poner una review");
            error.httpStatus = 401;
            throw error;
        }        
        if (!puntuation || puntuation > 5 || puntuation < 1) {
            const error = new Error("Falta la puntuación o el valor es incorrecto");
            error.httpStatus = 401;
            throw error;
        }

        /**Falta comprobar que el usuario tenga permiso, que coincida id_user con id falta coger id_deal y falta comprobar que no se haya votado ya */
        
        await connection.query(
            `
            insert into ratingTable (id_deal, id_product, rating, rated)
            values (?, ?, ?, ?)
            `,
            [id_deal, values[0].id_product, puntuation, true]
        );
    } catch (error) {
        res.send( {
            status: "ok",
            message: "Producto valorado"
        })
    } finally {
        if (connection) connection.release();
    }
}

module.exports = voteProduct;