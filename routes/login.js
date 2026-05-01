import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import express from "express";
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
    const {name, password} = req.body;

    const user = await Db.collection("accounts").findOne({name});
    if (!user) return res.status(401).send("Invalid Credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Invalid Credentials");

    const token = jsonwebtoken.sign(
        {userId: user._id, role: user.role},
        "super_secret",
        {expiresIn: "1h"}
    );

    res.json({ token });
});

export default router;