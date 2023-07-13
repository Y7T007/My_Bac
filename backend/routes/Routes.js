const CourseModel=require( "../models/CourseModel");
const express =require('express')

const {getAllCourses,getCourse}=require('../controllers/CoursesController')
const router= express.Router()

router.get('/',getAllCourses)
router.get('/:id',getCourse)

module.exports=router