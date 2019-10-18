const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('./../model/user');

router.get('/', verify, (req, res) => {
    /* 
        // Find a data based on individual user.
        res.send(req.user);
        const userData = User.findOne({_id: req.user._id});
        res.send(userData);
    */

    res.json({
        data: {
            title: "Chart 1",
            data: [1,2,3,4,5,6,7,8,9,10]
        }
    });
});

module.exports = router;