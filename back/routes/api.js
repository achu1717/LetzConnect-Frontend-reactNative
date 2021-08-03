// API
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');
const EducationController = require('../controllers/EducationController');
const ExperienceController = require('../controllers/ExperienceConroller');
const SkillsController = require('../controllers/SkillsController');
const MessageController = require('../controllers/MessageController');



const passport = require('passport')
const path = require('path')
const jwtAuth = require('../middleware/passport')

const authUser = jwtAuth(passport).authenticate("jwt", { session: false });
//user and admin API's

router.post('/user/signup', UserController.userRegister)
router.post('/user/signin', UserController.login)
router.put('/user/update', authUser, UserController.update)
router.get('/user/get', authUser, UserController.getUser)

//Education
router.post('/education/create',authUser, EducationController.createEducation)
router.get('/education/getAll', authUser, EducationController.getEducation)
router.put('/education/update', authUser, EducationController.updateEducation)
router.post('/education/get', authUser, EducationController.getAllEducation)

//Experience
router.post('/experience/create',authUser, ExperienceController.createExperience)
router.get('/experience/getAll', authUser, ExperienceController.getExperience)
router.put('/experience/update', authUser, ExperienceController.updateExperience)
router.post('/experience/get', authUser, ExperienceController.getAllExperience)

//Skills
router.post('/skills/create',authUser, SkillsController.createSkills)
router.put('/skills/update', authUser, SkillsController.updateSkills)
router.get('/skills/get', authUser, SkillsController.getSkills)




// Message

router.post('/message/create',authUser, MessageController.createMessage)
router.get('/message/getAll', authUser, MessageController.findAll)
router.get('/message/get', authUser, MessageController.findOne)
router.put('/message/update', authUser, MessageController.update)
router.post('/message/get', authUser, MessageController.deleteMessage)
module.exports = router
