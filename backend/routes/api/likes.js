const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const  {Like,Song} = require("../../db/models")

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
    const songs = await Song.findAll({
        where: {
            id: songsId
        }
    })
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
        likeId: like.id
    })
}),
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { songId, userId} = req.body;
        const like = await Like.create({ songId, userId});
        await res.json({like})
    })
)

module.exports = router
