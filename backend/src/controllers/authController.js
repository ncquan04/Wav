const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await authService.login(name, password);
        req.session.user = user;
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

exports.checkSession = async (req, res) => {
    if (req.session.user) {
        res.status(200).json({ success: true, user: req.session.user });
    } else {
        res.status(401).json({ success: false, message: 'User not logged in' });
    }
}