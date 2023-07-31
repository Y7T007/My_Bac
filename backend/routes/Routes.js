const express =require('express')


const {getAllCourses,getCourse,getCourseByLevel}=require('../controllers/CoursesController')
const router= express.Router()

router.get('/',getAllCourses)
router.get('/:id',getCourse)
router.get('/menu/:level/:subject',getCourseByLevel)


module.exports=router
