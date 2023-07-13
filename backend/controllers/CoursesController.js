const Course =require('../models/CourseModel')

const mongoose = require('mongoose');


//GET ALL DATA
const getAllCourses= async (req,res)=>{
    const Courses =await Course.find({})
    res.status(200).json(Courses)
}

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