const User = require('../../models/User');
const bycrypt = require('bcryptjs');
const registerUser = async (req, res) => {
    const { userName, userEmail, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ userName }, { userEmail }] });
    if(existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bycrypt.hash(password, 12);
    try {   
        const user = new User({ userName,userEmail,role,password:hashedPassword });
        await user.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { registerUser };