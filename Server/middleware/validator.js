const branches = require('../config/branches');

const studentValidator = (req, res, next) => {
    const { name, rollNo, branch, batch } = req.body;

    if (!name || !rollNo || !branch || !batch) return res.status(400).json({ 'message': 'All fields required' });
    if (rollNo.length !== 10) return res.status(400).json({ 'message': 'Enter vaild roll number' });
    if (!branches.includes(branch)) return res.status(400).json({ 'message': 'branch should be valid' });
    if (batch[0] !== 'R' || batch.length !== 3) return res.status(400).json({ 'message': 'batch should be valid' });

    regexName = /^[A-Z][A-Za-z ]{2,29}/g;
    validName = regexName.test(name);
    if (!validName) return res.status(400).json({ 'message': 'name should be valid' });

    next();
};

const commentValidtor = (req, res, next) => {
    const { data } = req.body;

    if (!data) return res.status(400).json({ 'message': 'data is null' });
    if (data.length < 3 || data.length > 150) return res.status(400).json({ 'message': 'data should be in range of 3 to 150 words' });

    next();
};

module.exports = {
    studentValidator,
    commentValidtor
}