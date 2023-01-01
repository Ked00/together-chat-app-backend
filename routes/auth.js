const express = require("express");
const router = express.Router();
const newUser = require("../models/newUser");

// auth file
router.post("/register", async (req, res, next) => {
    const registerUser = new newUser({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        session: req.session.id,
    })

    try {
        const matching = await newUser.findOne({ username: registerUser.username });

        if (matching) {
            res.send({ message: "Username not available", variant: "danger" })
        }
        else {
            await registerUser.save();
            res.send({ message: "User Created Successfully", variant: "success" });
        }
    }

    catch (err) {
        res.send({ message: "Something went wrong please try again.", variant: "danger" });
    }
})
// auth file
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await newUser.findOne({ username, password });


    if (user) {
        req.session.isLoggedIn = true;
        req.session.user = user
        res.send("ok");
    }
    else {
        res.send({ message: "Username or password is incorrect.", variant: "danger" });
    }
})


// auth file
router.get("/verify", (req, res, next) => {
    const currentSession = req.session.isLoggedIn

    if (!currentSession) {
        res.send("not authorized")
    }
    else {
        res.sendStatus(200)
    }
})


module.exports = router