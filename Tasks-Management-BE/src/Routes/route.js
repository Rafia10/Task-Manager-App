import express from 'express'
import { listUsers, login, signUp } from '../Controller/AuthController.js'
import verifyToken from '../Middleware/verifyToken.js'
import { createTask, deleteTask, listTask, updateTask, viewTask } from '../Controller/TaskController.js'
const router = express.Router()

//Auth Routes
router.post('/signup', signUp)
router.post('/login', login)


//Tasks Management
router.post('/create-task',verifyToken,createTask)
router.patch('/update-task/:id',verifyToken,updateTask)
router.delete('/delete-task/:id',verifyToken,deleteTask)
router.get('/view-task/:id',verifyToken,viewTask)
router.get('/list-tasks',verifyToken,listTask)
router.get('/filtered-users',listUsers)




export default router
