const getDB = require("../../dbConnection");
const { savePhoto } = require("../../helpers");

const modifyProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { location, description, price, name, category } = req.body;

    const { id } = req.params;

    console.log(location, description, price, name, category, req.files.photo);
    if (!location || !description || !price || !name || !category) {
      const error = new Error("Faltan campos");
      error.httpStatus = 400;
      throw error;
    }

    if (Object.keys(req.files).length === 0 || !req.files) {
      await connection.query(
        `
                  update product
                  set location = ?, description = ?,  price = ?,  name = ?,  category = ?
                  where id = ?
                  `,
        [location, description, price, name, category, id]
      );
    } else {
      const photo = await savePhoto(req.files.photo);
      await connection.query(
        `
                  update product
                  set location = ?, description = ?,  price = ?,  name = ?,  category = ?,  photo = ?
                  where id = ?
                  `,
        [location, description, price, name, category, photo, id]
      );
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = modifyProduct;
