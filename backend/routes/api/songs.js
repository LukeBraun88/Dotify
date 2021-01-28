

//holds the resources for the route paths beginning with /api/session
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const  {Song, User} = require("../../db/models")
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")

//Restore session user

//this is what interacts with my db to get the songs

const validateSongCreate = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a song name'),
    check('artist')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the artist'),
    check('songFile')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the song file'),
    handleValidationErrors,
];


router.get('/',asyncHandler(async (req, res) => {
    console.log("hitting route---------------------")
        const songs = await Song.findAll({
            order: [["createdAt", "DESC"]],
        })
        res.json({
            songs,
        });
    }),
);

router.post(
    '/',
    singleMulterUpload("song"),
    validateSongCreate,
    asyncHandler(async (req, res) => {
        const { name, artist} = req.body;
        const location = await singlePublicFileUpload(req.file)
        const song = await Song.songPOST({ name, artist, filePath: location});
        // await setTokenCookie(res, user);
        return res.json({
            song
        });
    }),
);

module.exports = router;
