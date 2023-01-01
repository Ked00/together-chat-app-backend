const express = require("express");
const router = express.Router();
const newUser = require("../models/newUser");

router.get("/info", (req, res) => {
    res.send({
        username: req.session.user.username,
        friends: req.session.user.friends,
        password: req.session.user.password
    });

})

router.patch("/update", async (req, res) => {
    const { newname, username, newPassword } = req.body

    if (!newname && !newPassword) {
        res.send({ message: "Please provide a username or password", variant: "danger" })
    }
    else {
        const user = await newUser.findOne({ username }).update({ username: newname, password: newPassword })
        res.send({ message: "user updated successfully", variant: "success" })
    }
})

module.exports = router