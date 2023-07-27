const express =require('express')

const {AddNewStudent,getAllStudents,getStudent,Login,getInfos,logoutStudent}=require('../controllers/StudentController')
const router= express.Router()


router.post('/add-student',AddNewStudent)
router.get('/student/:email',getStudent)
router.get('/students',getAllStudents)
router.post('/login',Login)
router.get('/getInfos',getInfos)
router.get('/logout',logoutStudent)


module.exports=router