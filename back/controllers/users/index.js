const newUser = require("./signup");
const login = require("./login");
const deleteUser = require("./deleteUser");
const getUserInfo = require("./getUserInfo");
const validateUser = require("./validateUser");
const editUserInfo = require("./editUserInfo");
const editPass = require("./editPass");
const recoverPass = require("./recoverPass");
const resetPass = require("./resetPass");

module.exports = {
    resetPass,
    recoverPass,
    editPass,
    editUserInfo,
    validateUser,
    getUserInfo,
    deleteUser,
    newUser,
    login,
}