const dotenv = require('dotenv')
dotenv.config()

const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);


const mongoose = require('mongoose')
const Course = require('./models/course')
const express = require('express')
const app = express()

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.get("/api/courses", async (req,res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/api/courses/:id", async (req,res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.post("/api/courses", async (req,res) => {
    try {
        const body = req.body;
        const course = await Course.create(body)
        res.status(201).json(newCourse);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ errors: messages });
        }

        res.status(500).json({ messages: err.message });
    }
})

app.put("/api/courses/:id", async (req,res) => {
    try {
        await Course.replaceOne({ _id: req.params.id }, req.body, { returnDocument: 'after', runValidators: true });
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(400).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ errors: messages });
        }

        res.status(500).json({ messages: err.message });
    }
});

app.delete("/api/course/:id", async (req,res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ messages: err.message });
    }
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI,)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('Could not connect to MongoDB', err));

