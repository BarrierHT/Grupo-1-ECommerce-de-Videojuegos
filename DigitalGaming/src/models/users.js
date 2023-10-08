const fs = require('fs');

const User = {
  fileName: '../data/usuarios.json',
  idGenerate: () => {
    let users = this.findAll();

    if (users.length > 0) {
      let lastUser = users.pop();

      return lastUser.id + 1;
    } else {
      return 1;
    }
  },
  findAll: () => {
    return this.getData();
  },
  getData: () => {
    return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
  },
  createUser: (usersData) => {
    let allUsers = this.findAll();
    let newUser = {
      id: this.idGenerate(),
      ...usersData,
    };
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers), null, ' ');
    allUsers.push(newUser);
    return newUser;
  },
  deleteUser: (id) => {
    let allUsers = this.findAll();
    let findUser = allUsers.filter((item) => item.id == id);
    fs.writeFileSync(this.fileName, JSON.stringify(findUser), null, ' ');
    return true;
  },
};

module.exports = User;
