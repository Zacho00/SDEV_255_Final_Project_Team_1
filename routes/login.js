import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import express from "express";
import {getAllAccounts, createAccount} from "../models/accounts.js"
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getAllAccounts());
});

router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const course = createCourse({ title, description });
  res.status(201).json(course);
});

router.post("/login", async (req, res) => {
    const {name, password} = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!role) return res.status(400).json({ message: "Role is required" });
    const account = createAccount({ name, password, role });
    res.status(201).json(account);
    // const user = await Db.collection("accounts").findOne({name});
    // if (!user) return res.status(401).send("Invalid Credentials");

    // const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.status(401).send("Invalid Credentials");

    // const token = jsonwebtoken.sign(
    //     {userId: user._id, role: user.role},
    //     "super_secret",
    //     {expiresIn: "1h"}
    });

//     res.json({ token });
//  });

export default router;