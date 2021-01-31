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
router.get('/', asyncHandler(async (req, res) => {
    const likes = await Like.findAll({
        order: [["createdAt", "DESC"]],
    })
    await
        res.json({
            likes,
        });
}),
);

router.get(`/songs/:id(\\d+)`, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userLikes = await Like.findAll({
        where:{
            userId:userId
        },
        order: [["createdAt", "DESC"]],
    })
    const songsId = await userLikes.map(like=>like.songId)
    // console.log("songs",songs)
    const songs = await Song.findAll({
        where: {
            id: songsId
        }
    })
    // console.log("likedSongs",likedSongs)
    await
        res.json({
            songs,
        });
}),
);

router.delete('/:id(\\d+)/:id2(\\d+)', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const songId = parseInt(req.params.id2, 10);
    const like = await Like.findOne({
        where: {
            userId: userId,
            songId: songId
        }
    })
    await like.destroy()
    res.json({
        like
    })
}),
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { songId, userId} = req.body;
        // console.log("req",req)
        // let likes = await Like.findAll({where: {
        //     userId: userId,
        //     songId:songId
        // }})

        // if(likes) {
        //     throw new Error(()=>"already liked")
        // }
        const like = await Like.create({ songId, userId});
        await res.json({like})
    })
)

module.exports = router
