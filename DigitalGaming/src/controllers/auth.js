const exp = require('constants');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
//const users = require('../models/users');
const { validationResult } = require('express-validator');

// Ruta al archivo JSON de productos
const usersFilePath = path.join(__dirname, '../data/usuarios.json');

function readUsersFile() {
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(usersData);
}

function saveUsersToFile(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users), 'utf8');
}

exports.fileRemove = (fileUrl) => {
  //Delete a File
  if (fs.existsSync(fileUrl))
    fs.unlink(fileUrl, (err) => (err ? console.log(err) : ''));
  //Check if a path exists and unlink it
  else console.log('The given path doesnt exist');
};

let generateID = () => {
  return uuidv4();
};

exports.getLogin = (req, res, next) => {
  res.render('users/login');
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  //console.log('login: ', email, ' ', password);

  const usersData = readUsersFile();

  // Verifica las credenciales del usuario
  const user = usersData.find((user) => user.email == email);

  console.log(user);

  if (user) {
    const hasMatch = await bcrypt.compare(password, user.password);
    if (!hasMatch) return res.redirect('/login');

    // Iniciar sesión almacenando la información del usuario en la sesión
    req.session.user = user;

    res.redirect('/');
  } else res.redirect('/login');
};

exports.getSignUp = (req, res, next) => {
  res.render('users/register');
};

exports.postSignUp = async (req, res, next) => {
  //Logica del formulario de registro de los usuarios.
  let newIdUser = generateID();

  //Variable con las validaciones
  const resultValidation = validationResult(req);
  //console.log(resultValidation.mapped());

  // console.log(req.body);

  //   if (!resultValidation.isEmpty() || req.file == undefined) {
  //     // console.log(resultValidation.errors);
  //     // console.log(req.file);

  //     if (req.file != undefined) this.fileRemove(req.file.location);

  //     //console.log('No validado');
  //     return res.status(402).redirect('/');
  //   }

  if (resultValidation.errors.length > 0) {
    res.render('users/register', {
      errors: resultValidation.mapped(),
      oldValue: req.body,
    });
  } else {
    const usersData = readUsersFile();

    // console.log('file: ', req.file);

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    let newUser = {
      id: newIdUser,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      ['user-image']: '/img/users/' + req.file.filename,
      password: hashedPassword,
    };

    // console.log('new user: ', newUser);

    usersData.push(newUser);

    saveUsersToFile(usersData);

    return res.redirect('/');
  }
};

exports.getLogout = (req, res, next) => {
  try {
    //if (req.session.user._id.toString() == req.user._id.toString()) {
    req.session.destroy((err) => {
      if (err) throw new Error('session error');
      res.redirect('/');
    });
    //}
  } catch (error) {
    next(error);
  }
};
