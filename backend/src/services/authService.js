const bcrypt = require('bcrypt');
const userModel = require('../models/UserModel');

exports.login = async (name, password) => {
    const user = await userModel.findByUsername(name);
    if (!user) {
        throw new Error('Incorrect username');
    }

    if (user.password !== password) {
        throw new Error('Incorrect password');
    }

    return {id: user.id, name: user.name};
}