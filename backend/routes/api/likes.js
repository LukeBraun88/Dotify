const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const  {Like,Song, User} = require("../../db/models")
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")
const { setTokenCookie, requireAuth } = require('../../utils/auth');


// router.get('/',asyncHandler(async (req, res) => {
//         const songs = await Song.findAll({
//             order: [["createdAt", "DESC"]],
//         })
//         res.json({
//             songs,
//         });
//     }),
// );


router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { songId, userId} = req.body;
        console.log("req",req)
        const like = await Like.create({ songId, userId});
        return res.json({like})
    })
)

module.exports = router
