const Course =require('../models/CourseModel')
const Student= require('../models/StudentModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');


//GET ALL DATA
const getAllCourses = async (req, res, next) => {
    try {
        // console.log(req)
        const token = req.headers.authorization.split(' ')[1]; // Extract the token from headers

        jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Handle expired token error
                    return res.status(401).json({ message: 'Token expired' });
                }

                console.log('Errrroooooor:',err)
            }
            req.userId = decoded.userId; // Store the decoded user ID in the request object
        });

        const userId = req.userId;
        console.log(userId);

        const courses = await Course.find({});
        const infosUser=await Student.findById(userId)
        const response={
            course:courses,
            userInfos:infosUser
        }

        res.status(200).send(response);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//GET ONE DATA
const getCourse= async (req,res)=>{
    const {id}=req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no course founded'})
    }
    const Course1 =await Course.findById(id)
    if (!Course1){
        res.json({error:'no course founded'})
    }


    res.status(200).json(Course1)

}
//CREATE

//DELETE

//UPDATE

module.exports={
    getAllCourses,
    getCourse
}