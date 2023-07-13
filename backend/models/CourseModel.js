const mongoose =require('mongoose')
const Schema=mongoose.Schema

const CourseSchema = new Schema(
    {
    course: {
        image: {
            type: String,
                required: true
        },
        name: {
            type: String,
                required: true
        },
        dispo: {
            type: String,
                required: true
        }
    },
    function: {
        Difficulty: {
            type: String,
            required: true
        },
        supply_item: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
            required: true
    },
    employed: {
        type: Date,
            required: true
    }
},{timestamps:true});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;