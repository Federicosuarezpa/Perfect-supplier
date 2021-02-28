const getDB = require("../../dbConnection");

const getUserInfo = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id } = req.params;

    const [user] = await connection.query(
      `
            select id, date, email, name, photo, bio
            from user
            where id=?
            `,
      [id]
    );
    const userInfo = {};
    if (user[0].id === req.userAuth.id) {
      userInfo.date = user[0].date;
      userInfo.email = user[0].email;
      userInfo.name = user[0].name;
      userInfo.photo = user[0].photo;
      userInfo.bio = user[0].bio;
    }
    res.send({
      status: "ok",
      data: userInfo,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUserInfo;
