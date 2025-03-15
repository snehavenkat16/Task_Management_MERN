const user = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userController = {
    userRegisteration: async (req, res) => {
        try {
            const { email, password } = req.body;
            if(!email || !password){
                return res.status(400).json({msg: "Please enter all the required fields"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new user({ email, password: hashedPassword });
            const userRes = await newUser.save();
            res.status(200).json({ msg: "User Registration is Success" });

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "User Registration is Failed" });
        }
    },

    userLogin : async (req, res) => {
        try{
            const { email, password } = req.body;
            if(!email || !password){
                return res.status(400).json({msg: "Please enter all the required fields"});
            }
            const user = await user.findOne({ email});
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token , msg :"User Successfully Logged In" });

        }catch(error){
            console.log(error);
            res.status(500).json({ msg: "Error while Logging in User" });
        }
    }
}

module.exports = userController;