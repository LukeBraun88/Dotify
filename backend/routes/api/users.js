//holds the resources for the route paths beginning with /api/users

const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie} = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const {singlePublicFileUpload, singleMulterUpload} = require("../../awsS3")

const router = express.Router();

//signup validator middleware
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Sign up
router.post(
    '/',
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const {location,key }= await singlePublicFileUpload(req.file)
        const user = await User.signup({ email, username, password, profileImageUrl: location});
        await setTokenCookie(res, user);
        return res.json({
            user
        });
    }),
);

module.exports = router;

