const Student = require('../models/student');
const Comment = require('../models/comment');

const getStudents = async (req, res, next) => {
    const { cId } = req;
    try {
        const foundStudents = await Student.find({ counsellor: cId }).exec();

        const studentList = foundStudents.map((student) => ({ id: student._id, rollNo: student.rollNo }));

        res.json(studentList);
    } catch (err) {
        next(err);
    }
};

const getStudent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const foundStudent = await Student.findById(id).exec();

        res.json(foundStudent);
    } catch (err) {
        next(err);
    }
};

const postStudent = async (req, res, next) => {
    const { cId } = req;
    const { name, rollNo, branch, batch } = req.body;

    try {
        const query = await Student.create({
            name,
            rollNo,
            branch,
            batch,
            counsellor: cId
        });

        res.status(201).json({ 'success': `Student ${query.rollNo} created` });
    } catch (err) {
        next(err);
    }
};

const putStudent = async (req, res, next) => {
    const { id } = req.params;
    const { cId } = req;
    const { name, rollNo, branch, batch } = req.body;

    try {
        const foundStudent = await Student.findById(id).exec();

        if (foundStudent.counsellor.toString() !== cId) return res.status(400).json({ 'message': 'Unauthorized' });

        foundStudent.name = name;
        foundStudent.rollNo = rollNo;
        foundStudent.branch = branch;
        foundStudent.batch = batch;

        foundStudent.save();

        res.json({ 'success': `Student ${foundStudent.rollNo} updated` });
    }
    catch (err) {
        next(err);
    }
};

const deleteStudent = async (req, res, next) => {
    const { id } = req.params;
    const { cId } = req;

    try {
        const foundStudent = await Student.findById(id).exec();

        if (foundStudent.counsellor.toString() !== cId) return res.status(400).json({ 'message': 'Unauthorized' });

        const query = await Student.findByIdAndDelete(id);

        res.json({ 'success': `Student ${query.rollNo} deleted` });
    } catch (err) {
        next(err);
    }
};

const getComments = async (req, res, next) => {
    const { id } = req.params;

    try {
        const foundComments = await Comment.find({ student: id });

        const commentList = foundComments.map((comment) => ({ id: comment._id, comment: comment.data }));

        res.json(commentList);
    } catch (err) {
        next(err);
    }
};

const postComment = async (req, res, next) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const query = await Comment.create({
            data,
            date: new Date(),
            student: id
        });

        res.status(201).json({ 'success': 'Comment created' });
    } catch (err) {
        next(err);
    }
};

const putComment = async (req, res, next) => {
    const { id, comId } = req.params;
    const { cId } = req;
    const { data } = req.body;

    try {
        const foundComment = await Comment.findById(comId).exec();
        const foundStudent = await Student.findById(id).exec();

        if (foundStudent.counsellor.toString() !== cId) return res.status(400).json({ 'message': 'Unauthorized' });
        if (foundComment.student.toString() !== id) return res.status(400).json({ 'message': 'Student is not found' });

        foundComment.data = data;
        foundComment.editedOn = new Date();

        foundComment.save();

        res.json({ 'success': 'Comment updated' });
    } catch (err) {
        next(err);
    }
};

const deleteComment = async (req, res, next) => {
    const { id, comId } = req.params;
    const { cId } = req;

    try {
        const foundComment = await Comment.findById(comId).exec();
        const foundStudent = await Student.findById(id).exec();

        if (foundStudent.counsellor.toString() !== cId) return res.status(400).json({ 'message': 'Unauthorized' });
        if (foundComment.student.toString() !== id) return res.status(400).json({ 'message': 'Student is not found' });

        const query = await Comment.findByIdAndDelete(comId).exec();

        res.json({ 'success': 'Comment deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getStudents,
    getStudent,
    postStudent,
    putStudent,
    deleteStudent,
    getComments,
    postComment,
    putComment,
    deleteComment
}