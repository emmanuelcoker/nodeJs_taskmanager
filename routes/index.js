const express = require('express');
const router = express.Router();

//import controllers
const HomeController = require('../app/controllers/homecontroller');
const TaskController = require('../app/controllers/taskcontroller');

//middlewares
const { ensureAuth}  = require('../app/middleware/authenticate');


// landing page
router.get('/',ensureAuth, HomeController.homepage);


//tasks
router.put('/tasks/:id', ensureAuth, TaskController.update);

//comments
router.post('/comment/:taskId', ensureAuth, TaskController.postComment);

module.exports = router;