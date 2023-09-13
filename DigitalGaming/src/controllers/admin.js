const path = require('path');
const fs = require('fs');

exports.getDash = (req, res, next) => {
    res.render('admin/dashboard')
};