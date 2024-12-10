const registerService = require('../services/registerService');

exports.register = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await registerService.register(name, password);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
};