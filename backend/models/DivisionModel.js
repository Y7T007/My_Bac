const mongoose =require('mongoose')
const Schema=mongoose.Schema

const DivisionSchema =new Schema(
    {
        rank: {
            type: Number, //1:bronze,2:silver,3:gold,4:platinium,5,cristal,6:legends,7:world class
                index: true,
        },
        level: {
            type: String,
                index: true,
        },
        student_id: {
            type: [String],
        },
        student_names: {
            type: [String],
        },
        student_scores: {
            type: [Number], // Array to store multiple scores for a student
        },
    },
    { timestamps: true }

)

const Divisions = mongoose.model('Divisions', DivisionSchema);

module.exports = Divisions;