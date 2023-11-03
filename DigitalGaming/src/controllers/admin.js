const path = require('path');
const fs = require('fs');

exports.getDash = (req, res, next) => {
    res.render('admin/dashboard.ejs')
};

const User = require('../app').models.user;

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

/* getAllUsers()
    .then(users => {
        console.log('Usuarios:', users);
    })
    .catch(error => {
        console.error('Error:', error);
    });
 */
