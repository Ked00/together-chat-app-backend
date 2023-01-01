const express = require("express");
const router = express.Router();
const newUser = require("../models/newUser");

// searching file
router.post("/findFriend", async (req, res, next) => {
    const foundUser = await newUser.findOne({ username: req.body.username });

    if (foundUser) {
        req.session.foundUser = foundUser.username
        res.send(foundUser.username)
    }
})

// searching file
router.post("/add", (req, res) => {
    const addFriend = req.session.foundUser

    if (addFriend) {
        req.session.user.friends.push(addFriend)
        res.send(`${addFriend} has been added to you friends list`)
    }
})


module.exports = router