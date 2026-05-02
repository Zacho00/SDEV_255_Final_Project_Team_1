import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getAllAccounts, getAccountByName, createAccount } from "../models/accounts.js";


const router = express.Router();

// dev tool - remove later

router.get("/", async (req, res) => {
    res.json(await getAllAccounts());
})

// POST /register
router.post("/register", async (req, res) => {
    const { name, password, role } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required" });
    }

    const account = await createAccount({ name, password, role });
    if (!account) 
        return res.status(409).json({ message: "Username already taken" })
    
    res.status(201).json({ message: "User created", account });
});

router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required" });
    }

    const user = await getAccountByName(name);
    if (!user) 
        return res.status(401).json({ message: "Invalid credentials" });
    

    const match = await bcrypt.compare(password, user.password);
    if (!match) 
        return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        process.env.JWT_SECRET || "super_secret",
        { expiresIn: "1h" }
    );

    res.json({ token })
    
});

export default router;