const router = require('express').Router();
const User = require('./../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerUserValidation, loginUserValidation } = require('./../validation');

// User Registration Route
router.post('/register', async (req, res) => {
    // Validating user before user creation
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    const { error } = registerUserValidation(req.body);
    if (error) {
        return res.status(400).json(
            {
                type: 'error',
                message: error.details[0].message
            }
        );
    } else {
        // If user already in the database
        const userEmailExist = await User.findOne({ email: req.body.email });
        if (userEmailExist) {
            return res.status(400).json(
                {
                    type: 'error',
                    message: "Email already exists"
                }
            );
        } else {
            // Encrypt password
            const encryptPass = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, encryptPass);

            // Create an user
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            });
            try {
                const savedUser = await user.save();
                res.send({user: user.id});
            } catch {
                res.status(400).send(err);
            }
        }
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    // Validating the data is exist or not
    const { error } = loginUserValidation(req.body);
    if(error) {
        return res.status(400).json(
            {
                type: 'error',
                message: error.details[0].message
            }
        )
    } else {
        // Checking the email exists or not
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(400).json(
                {
                    type: 'error',
                    message: 'Email is not found'
                }
            ) 
        } else {
            // Password is correct or not
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) {
                return res.status(400).json(
                    {
                        type: 'error',
                        message: 'Invalid Password'
                    }
                ) 
            } else {
                // Creating JWT tokens if user exists
                const token = jwt.sign( {_id: user._id}, process.env.TOKEN_SECRET );
                res.header('auth-token', token).json(
                    {
                        token: token
                    }
                );
            }
        }
    }
});


module.exports = router;