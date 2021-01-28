

//holds the resources for the route paths beginning with /api/session
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const  {Song, User} = require("../../db/models")
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3")
const { setTokenCookie, requireAuth } = require('../../utils/auth');

//Restore session user

//this is what interacts with my db to get the songs

const validateSongCreate = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a song name'),
    check('artist')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the artist'),
        handleValidationErrors,
    ];
    // check('songFile')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide the song file'),


router.get('/',asyncHandler(async (req, res) => {
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
    singleMulterUpload("songFile"),
    validateSongCreate,
    asyncHandler(async (req, res) => {
        const { name, artist, userId} = req.body;
        console.log("req",req)
        const location = await singlePublicFileUpload(req.file)
        const song = await Song.upload({ name, artist, filePath: location, userId});

        return res.json({
            song
        });
    }),
);

module.exports = router;
