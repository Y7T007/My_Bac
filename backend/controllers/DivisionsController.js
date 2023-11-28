const Division  = require('../models/DivisionModel');
const Student = require('../models/StudentModel');

const createDiv = async (rank, level, student_id, student_scores) => {
    try {
        const newDivision = new Division({
            rank,
            level,
            student_id,
            student_scores,
            student_names
        });

        // Save the division to the database
        await newDivision.save();
    } catch (e) {
        console.error(e);
    }
};

const joinDiv = async (student_id) => {
    try {
        const StudentJoin = await Student.findById(student_id);

        // Find a division with fewer than 40 students
        const existingDivision = await Division.findOne({ $where: "this.student_id.length < 40",level:StudentJoin.level,rank:StudentJoin.rank });

        if (existingDivision) {
            // Add the student to the existing division and initialize their score to 0
            existingDivision.student_id.push(student_id);
            existingDivision.student_names.push(StudentJoin.name);
            existingDivision.student_scores.push(0);

            // Save the updated division
            await existingDivision.save();

            return { message: 'Student added to existing division', division: existingDivision };
        } else {
            // Create a new division and add the student
            const newDivision = new Division({
                rank: StudentJoin.rank,
                level:StudentJoin.level,
                student_id: [student_id],
                student_names:StudentJoin.name,
                student_scores: [0],
            });

            // Save the new division
            await newDivision.save();

            return { message: 'New division created and student added', division: newDivision };
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};


const updateDiv = async (req,res) => {
    try {
        const {studentId,score}=req.params

        console.log(studentId,score);
        try{
            const student = await Student.findById(studentId).orFail();
            const division = await Division.findById(student.divisionId).orFail();
            if (!division) {
                throw new Error('Division not found');
            }
    
            // Find the index of the student within the division
            const studentIndex = division.student_id.indexOf(studentId);
    
            if (studentIndex === -1) {
                throw new Error('Student not found in division');
            }
    
            // Update the student's score
            division.student_scores[studentIndex] += parseInt(score);
    
            // Save the updated division
            await division.save();
    
            return res.status(200).json({ message: 'Division updated successfully', division });
            
        }catch(e){
            console.log(e);
        }

        // Find the division by its ID

    } catch (e) {
        console.error(e);
        throw e;
    }
};
const getDivision = async (req, res) => {
    try {
        const student_id = req.params.studentId;

        const student = await Student.findById(student_id).orFail();
        let division = null; // Initialize division as null

        console.log('Student divisionId:', student.divisionId, 'student id:', student_id);

        if (student.divisionId) {
            // If the student already has a division, try to fetch it
            try {
                division = await Division.findById(student.divisionId);

                if (division) {
                    // The division exists, update it
                    division.someProperty = 'updated value'; // Update division properties as needed
                    await division.save();
                } else {
                    // The division does not exist, handle this case (e.g., log a message or take appropriate action)
                    console.log('Division does not exist for the student.');
                    const removeDiv = (!division)?{ $unset: { divisionId: 1 } } : {};
                    // Update the student's division (e.g., update division properties)
                    const result = await Student.updateOne({ _id: student_id }, removeDiv);
                    if (result.nModified === 1) {
                        // Field removed successfully
                        console.log('div resetted succc');
                    } else {
                        // Field not found or no changes were made
                        console.log('div nooooot  resetted succc');
                        const result = await joinDiv(student_id);
                        division = result.division;

                        // Update the student's divisionId in the database
                        student.divisionId = division._id;
                        await student.save();
                    }
                }
            } catch (e) {
                // Handle any other errors that might occur during the database query
                console.error('division problem 1 :',e);
            }
        }else {
            // If the student doesn't have a division, create a new one
            const result = await joinDiv(student_id);
            division = result.division;

            // Update the student's divisionId in the database
            student.divisionId = division._id;
            await student.save();
        }

        res.status(200).json(division);
    } catch (e) {
        console.error('division problem 2 :',e);
        res.status(404).json({ error: 'Student or Division not found' });
    }
};

const weeklyUpdate = async (req, res) => {
    try {
        // Get all existing divisions
        const allDivisions = await Division.find();

        for (const division of allDivisions) {
            let upNumOfStudents = 0;

            if (division.rank < 3) {
                upNumOfStudents = 5;
            } else if (division.rank >= 3 && division.rank < 5) {
                upNumOfStudents = 3;
            } else if (division.rank >= 5) {
                upNumOfStudents = 1;
            }

            const topStudents = await Student.find({ divisionId: division._id }).sort({ score: -1 }).limit(upNumOfStudents);
            
            for (const student of topStudents) {
                student.rank +=parseInt(1); // You can set the rank as needed
                await student.save();
            }

                    // Downgrade students with inactivity within each division
        const inactiveStudents = [];

        for (let index = 0; index < division.student_id.length; index++) {
            const studentId = division.student_id[index];


            // Perform your logic to determine inactivity here
            if (parseInt(division.student_scores[index]) === 0) {
                inactiveStudents.push(studentId);
            }
        }

        for (const studentId of inactiveStudents) {
            const student = await Student.findById(studentId);
            student.rank -= 1; // Downgrade to
            await student.save();
        }

            // Delete the current division

            await division.deleteOne();
        }

        res.status(200).json({ message: 'Weekly update completed successfully for all divisions' });
    } catch (e) {
        console.error('Weekly update error:', e);
        res.status(500).json({ error: 'An error occurred during the weekly update' });
    }
};


module.exports = { createDiv, joinDiv, updateDiv, getDivision ,weeklyUpdate};
