import bcrypt from "bcrypt";
import express from "express";

const app = express();

const router = express.Router();

router.post("/register", async (req, res) => {
    const {name, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("accounts").insertOne({
        name,
        password: hashedPassword,
        role: ""
    });

    res.send("User created");
});

export default router;