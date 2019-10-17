const router = require('express').Router();
const User = require('./../model/user')
const bcrypt = require('bcryptjs');
const { registerUserValidation, loginUserValidation } = require('./../validation');

// User Registration Route
router.post('/register', async (req, res) => {
    // Validating user before user creation
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
router.post('/login', (req, res) => {
    res.send("login");
});


module.exports = router;