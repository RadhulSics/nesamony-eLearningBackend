const express=require('express')
const router=express.Router()
const Student=require('./Student/studentController')
const trainers=require('./Trainer/trainerController')
const parents=require('./Parent/ParentController')
const lectures=require('./Trainer/lectureController')
const course=require('./Trainer/courseController')
const subscription=require('./Subscription/subscriptionController')
const assignment=require('./Trainer/Exam/assignController')
const exams=require('./Trainer/Exam/examController')
const chats=require('./chats/chatController')


//Student  routes
router.post('/registerStudent',Student.registerStudent)
router.post('/loginStudent',Student.login)
router.post('/viewStudents',Student.viewStudents)
router.post('/editStudentById/:id',Student.editStudentById)
router.post('/viewStudentById/:id',Student.viewStudentById)
router.post('/deleteStudentById/:id',Student.deleteStudentById)

router.post('/forgotPwdStd',Student.forgotPassword)


//trainer  routes
router.post('/registerTrainer',trainers.registerTrainer)
router.post('/loginTrainer',trainers.login)
router.post('/viewTrainers',trainers.viewTrainers)
router.post('/editTrainerById/:id',trainers.editTrainerById)
router.post('/viewTrainerById/:id',trainers.viewTrainerById)
router.post('/forgotPwdTrainer',trainers.forgotPassword)
router.post('/delTrainerById/:id',trainers.deleteTrainerById)
// router.post('/addRating/:id',trainers.addRating)



router.post('/addLecture',lectures.upload,lectures.addLecture)
 router.post('/deleteLectureById/:id',lectures.delLectureById)
 router.post('/viewLectureById/:id',lectures.viewLectureById)
 router.post('/approveLecture/:id',lectures.updateLectureByAdmin)
 router.post('/DeleteLecture/:id',lectures.DeleteLecture)

 
 router.post('/viewLectureReqs',lectures.viewLectureReqs)
 router.post('/viewAprvdLecture',lectures.viewAprvdLectures)
 router.post('/uploadVideoLecture/:id',lectures.upload2,lectures.updateVideoLecture)


 router.post('/addReview/:id',lectures.addReview)
 router.post('/viewLectureByCourse/:id',lectures.viewLectureByCourse)
 router.post('/viewLectureByCourseType/:id',lectures.viewLectureByCourseType)




//Parent  routes
router.post('/registerParent',parents.registerParent)
router.post('/loginParent',parents.login)
router.post('/viewParents',parents.viewParents)
router.post('/editParenttById/:id',parents.editParentById)
router.post('/viewParentById/:id',parents.viewParentById)
router.post('/deleteParentById/:id',parents.deleteParentById)

router.post('/forgotPwdParent',parents.forgotPassword)



//pgm routes

router.post('/viewCourses',course.viewPgms)
router.post('/ApproveCourse/:id',course.Approvepgm)
router.post('/DeletePGM/:id',course.DeletePGM)


router.post('/addCourse/:id',course.addCourse)
router.post('/removeCourseById/:id',course.removePgmById)
router.post('/viewCourseRequests',course.viewPgmRequests)
router.post('/viewCourseByTrainerId/:id',course.viewPgmByTrainerId)
router.post('/viewCourseById/:id',course.viewPgmById)
router.post('/addRating/:id',course.addRating)



//Subscriptions
router.post('/subscribePgm',subscription.subscribePgm)
router.post('/Unsubscribe/:id',subscription.Unsubscribe)
router.post('/viewMysubscriptions/:id',subscription.viewMysubscriptions)
router.post('/viewSubscriptionsByCId/:id',subscription.viewSubscriptionsByCId)
router.post('/viewUnSubscriptionsByCId/:id',subscription.viewUnSubscriptionsByCId)
router.post('/updatePaymentBySid/:id',subscription.updatePaymentBySid)




//Exams
router.post('/addExam',exams.addExam)
router.post('/addAnswers',exams.addAnswers)
router.post('/viewExamById/:id',exams.viewExamById)
router.post('/viewExamByTrainerId/:id',exams.viewExamByTrainerId)
router.post('/viewExamsforstud',exams.viewExamsforstud)
router.post('/viewPendingExam/:id',exams.viewPendingExamforCourse)
router.post('/valuateExamById/:id',exams.valuateExamById)
router.post('/viewExams/:id',exams.viewExams)
router.post('/removeExamById/:id',exams.removeExamById)
router.post('/viewAnswersbyId/:id',exams.viewAnswersbyId)

router.post('/viewValuedExam/:id',exams.viewValuedExam)
router.post('/viewValuedExamForStudents',exams.viewValuedExamForStudents)
router.post('/viewValuedExamForStudentsByID/:id',exams.viewValuedExamForStudentsByID)
router.post('/viewValuedExamForStudentsForProgress/:id',exams.viewValuedExamForStudentsForProgress) // progress


//Assignments
router.post('/addAssignment',assignment.addAssignment)
router.post('/addAnswersforAssignment',assignment.addAnswers)
router.post('/viewAssignmentById/:id',assignment.viewAssignmentById)
router.post('/viewAssignmentByTrainerId/:id',assignment.viewAssignmentByTrainerId)
router.post('/viewAssignmentsforstud',assignment.viewAssignmentsforstud)
router.post('/viewPendingAssignment/:id',assignment.viewPendingAssignment)
router.post('/valuateAssignmentById/:id',assignment.valuateAssignmentById)
router.post('/viewAssignments/:id',assignment.viewAssignments)
router.post('/removeAssignmentById/:id',assignment.removeAssignmentById)
router.post('/viewValuedAssignment/:id',assignment.viewValuedAssignment)
router.post('/viewValuedAssignmentForStudents',assignment.viewValuedAssignmentForStudents)
router.post('/viewValuedAssignmentForStudentsByID/:id',assignment.viewValuedAssignmentForStudentsByID)
router.post('/viewValuedAssignmentForStudentsForProgress/:id',assignment.viewValuedAssignmentForStudentsForProgress) // progress



router.post('/viewAssignAnswersbyId/:id/:studentid',assignment.viewAnswersbyId)

//chat routes
router.post('/createChat',chats.createChat)

router.post('/viewTrainersforparent',chats.viewTrainersforparent)

router.post('/viewChatForTrwithParent',chats.viewChatForTrwithParent)
router.post('/viewChatForTrwithStudent',chats.viewChatForTrwithStudent)


router.post('/viewParentssforTr/:id',chats.viewParentssforTr)
router.post('/viewStudentsforTr/:id',chats.viewStudentsforTr)


module.exports=router