const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required']},
    instructor: { type: String, required: [true, 'Instructor is required']},
    credits: { type: Number, required: [true, 'Credits are required']},
    description: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Course', courseSchema);