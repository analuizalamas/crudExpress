const express = require("express");

const routes = express.Router();

let users = require("../users");

//Middlewaves
/*function validateEmail (req, res, next) {
    const { email } = req.body;

    if(email && email >= 0){
        next();
    }

    return res.status(400).send('Usuário com email inválido.')
}

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i
console.log('foo.bar@gmail.com =>', emailRegex.test('foo.bar@gmail.com'))
console.log('foo.bar@gmail.com.br =>', emailRegex.test('foo.bar@gmail.com.br'))
console.log('foo.bar@gmail.com.br.br =>', emailRegex.test('foo.bar@gmail.com.br.br'))
console.log('foo.bar@gmail. =>', emailRegex.test('foo.bar@gmail.'))
console.log('foo.bar@gmailcom =>', emailRegex.test('foo.bar@gmailcom'))
console.log('foo.bargmail.com =>', emailRegex.test('foo.bar

*/

// POST para adicionar um usuário seguindo as propriedades citadas.
routes.post("/", (req, res) => {
  const newUser = req.body;

  users = [...users, newUser];

  return res.status(201).json({ message: "Usuário criado com sucesso!" });
});

// PUT para modificar informações de um usuário.
routes.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const content = req.body;

  const findUser = users.findIndex((user) => user.id === id);
  products[findUser] = content;

  res.status(200).json({ message: "Produto atualizado com sucesso!" });
});

// GET para verificar a lista de usuários.
routes.get("/", (req, res) => {
  res.status(200).json(users);
});

routes.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const details = req.params.details || "Sem descrição.";
  console.log(details);

  const email = req.params.email;
  console.log(email);

  const user = users.find((user) => user.id === id);

  res.status(200).json(user);
});

// DELETE para deletar um usuário.

routes.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const username = users.find((user) => user.id === id);

  if (!username) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }
  users = users.filter((user) => user.id !== id);

  res.status(200).json(users);
});

// Pesquise sobre o método PATCH e faça um endpoint que permita atualizar APENAS a senha do usuário.
routes.patch("/:id", (req, res) => {
  const { id } = req.params;
  const change = req.body;

  if (Object.keys(change) != "password") {
    return res.send(403).json();
  }

  users.forEach((user) => {
    if (user.id == id) {
      user.password = change.password;
    }
  });

  return res.status(200).json(users);
});

//exportado
module.exports = routes;
