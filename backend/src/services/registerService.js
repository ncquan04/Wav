const userModel = require('../models/UserModel')

exports.register = async(name, password) => {
    const existingUser = await userModel.findByUsername(name);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const newUser = await userModel.createUser(name, password);

    return { id: newUser.id, name: newUser.name }
}