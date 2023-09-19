const {Division} =require('../models/DivisionModel')
const {CreateTwoTone} = require("@material-ui/icons");

const CreateDiv=async (rank, level, student_id, student_scores)=>{
    try{
        const newDivision = new Division({
            rank,
            level,
            student_id,
            student_scores,
        });

        // Save the division to the database
        await newDivision.save();
    }catch (e) {
        console.log(e);
    }
}
const JoinDiv = async (req,res,student_id)=>{
    // Find a division with less than 40 students
    const existingDivision = await Division.findOne({ student_scores: { $size: { $lt: 40 } } });

    if (existingDivision) {
        // Add the student to the existing division and initialize their score to 0
        existingDivision.student_id.push(student_id);
        existingDivision.student_scores.push(0);

        // Save the updated division
        await existingDivision.save();

        res.status(200).json({ message: 'Student added to existing division', division: existingDivision });
    } else {
        // Create a new division and add the student
        await CreateDiv(1, 'bronze', [student_id], [0]);
        res.status(201).json({ message: 'New division created and student added', division: newDivision });
    }
}

const UpdateDiv = async (req,res)=>{
    const { divisionId, studentId } = req.params;
    const { newScore } = req.body;

    // Find the division by its ID
    const division = await Division.findById(divisionId);
    if (!division) {
        return res.status(404).json({ message: 'Division not found' });
    }
    // Find the index of the student within the division
    const studentIndex = division.student_id.indexOf(studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found in division' });
    }
    // Update the student's score
    division.student_scores[studentIndex] = newScore + Division.Score[studentIndex] ;
    // Save the updated division
    await division.save();
}