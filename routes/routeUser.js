const express = require('express');

const routes = express.Router();

let users = require("../users");

//Middlewaves

function validateEmail (req, res, next) {
    const { email } = req.body;

    if(email && email >= 0){
        next();
    }

    return res.status(400).send('Usuário com email inválido.')
}

// POST

routes.post('/', validateEmail,(req, res) => {
    const content = req.body;
  
    products = [...users, content];
  
    return res.status(201).json(users);

});

// PUT

routes.put('/:id', (req,res) => {
    const id = Number(req.params.id);
    const content = req.body;

    const users = users.find((user) => user.id === id);

    if (!users) {
        res.status(400).json({"message":"usuário não encontrado"})
    }

    const uptadeUser = products.map((user) =>{
        if(user.id === id) return content;

        return user;
    })
        users = uptadeUser;

        res.status(200).json(users)
    });

    // GET 
routes.get('/', (req,res) =>{
    res.status(200).json(users);
})

routes.get("/:id", (req, res) =>{
    const id = Number(req.params.id);

    const details = req.params.details || 'Sem descrição.';
    console.log(details);

    const email = req.params.email;
    console.log(email)

    const user = users.find((user) => user.id === id)

    res.status(200).json(user);
    
});

// DELETE 

routes.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
  
    const username = users.find((user) => user.id === id);
  
     if (!username) {
      return res.status(400).json({"message":"Usuário não encontrado"})
     }
     users = users.filter((user) => user.id !== id);
      
     res.status(200).json(users);
  });

  //exportado
  module.exports = routes;