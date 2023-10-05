const exp = require('constants');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
//const users = require('../models/users');
const { validationResult } = require('express-validator');

// Ruta al archivo JSON de productos
const usersFilePath = path.join(__dirname, '../data/usuarios.json');

function readUsersFile() {
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(usersData);
}

let generateID = () => {
  return uuidv4();
};

exports.getLogin = (req, res, next) => {
  res.render('users/login');
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  //console.log('login: ', email, ' ', password);

  const usersData = readUsersFile();

  // Verifica las credenciales del usuario
  const user = usersData.find(
    (user) => user.email == email && user.password == password
  );

  console.log(user);

  if (user) {
    // Iniciar sesión almacenando la información del usuario en la sesión
    req.session.user = user;

    // Redirigir a la página de perfil o a la home
    res.redirect('/'); // Reemplaza con la ruta correcta
  } else {
    // Si las credenciales son incorrectas, redirigir al login nuevamente
    res.redirect('/login');
  }
};

exports.getSignUp = (req, res, next) => {
  res.render('users/register');
};

exports.postSignUp = (req, res, next) => {
  //Logica del formulario de registro de los usuarios.
  let newIdUser = generateID;

  let resultValidation = validationResult(req);

  const usersFilePath = path.join(__dirname, '../data/usuarios.json');

  const json = () => {
    let json = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(json);
  };

  let newUser = {
    id: newIdUser,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    imagen: req.file.fileName,
    password: req.body.password,
  };

  json.push(newUser);

  function saveUsersToFile(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  }

  saveUsersToFile(json);

  return res.redirect('/');
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
