const express =require('express')


const {getDivision, updateDiv,weeklyUpdate}=require('../controllers/DivisionsController')
const router= express.Router()

router.get('/get/:studentId',getDivision);
router.post('/update/:studentId/:score',updateDiv),
router.get('/weekUpdate',weeklyUpdate)

module.exports=router
