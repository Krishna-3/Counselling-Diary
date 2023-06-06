const express = require("express");
const router = express.Router();
const studentController = require('../controller/studentController');
const validator = require('../middleware/validator');

router.get('/', studentController.getStudents);

router.post('/new', validator.studentValidator, studentController.postStudent);

router.route('/:id')
    .get(studentController.getStudent)
    .put(validator.studentValidator, studentController.putStudent)
    .delete(studentController.deleteStudent);

router.get('/:id/comments', studentController.getComments);

router.post('/:id/new', validator.commentValidtor, studentController.postComment);

router.route('/:id/comments/:comId')
    .get(studentController.getComment)
    .put(validator.commentValidtor, studentController.putComment)
    .delete(studentController.deleteComment);

module.exports = router;