const getDB = require("../../dbConnection");

const getReview = async (req, res, next) => {
  let connection;

  const { id_deal } = req.params;

  try {
    connection = await getDB();
    const [deal] = await connection.query(
      `
            select *
            from ratingTable
            where id_deal = ?
            `,
      [id_deal]
    );
    console.log(deal.length);
    res.send({
      status: "ok",
      message: deal,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getReview;
