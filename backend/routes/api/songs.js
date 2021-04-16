

//holds the resources for the route paths beginning with /api/session
const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const  {Song} = require("../../db/models")
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { singlePublicFileUpload, singleMulterUpload, removeFile } = require("../../awsS3")

const validateSongCreate = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a song name'),
    check('artist')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the artist'),
        handleValidationErrors,
    ];

router.get('/',asyncHandler(async (req, res) => {
        const songs = await Song.findAll({
            order: [["createdAt", "DESC"]],
        })
        return res.json({
            songs,
        });
    }),
);

router.delete('/:id(\\d+)',asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.id, 10);
    const song = await Song.findByPk(songId);
        await removeFile(song.key)
        await song.destroy()
        res.json({
            message:"the song was deleted"
        })
    }),
);

router.post(
    '/',
    singleMulterUpload("songFile"),
    validateSongCreate,
    asyncHandler(async (req, res) => {
        const { name, artist, userId} = req.body;
        const {location, key} = await singlePublicFileUpload(req.file)
        const song = await Song.upload({ name, artist, filePath: location, key, userId});
        return res.json({
            song
        });
    }),
);

module.exports = router;
