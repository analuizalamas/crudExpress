const express = require('express');

const routes = express.Router();

let products = require("../produtos");

function validatePrice (req, res, next) {
    const { price } = req.body;

    if(price && price >= 0){
        next();
    }

    return res.status(400).send('Produto com preço inválido.')
}

// POST

routes.post('/', validatePrice,(req, res) => {
    const content = req.body;
  
    products = [...products, content];
  
    return res.status(201).json(products);

});

/*
produto
function createUser(req, res, next) {      // passar createUser na rota ('./', createUser )
    res.locals.user = {       // res é um objeto
        nome: 'Matheus',
        admin: true
    }

    next();
};

function authUser (req, res, next) {
    const { user } = res.locals; 

    if(user.admin){
        next();
    }

    return res.status(403).send('O user nao é admin') // passar authUser na rota ('./', authuser )
}
*/ 

// PUT
    routes.put('/:id', (req, res) => {
        const id = Number(req.params.id);
        const content = req.body;
    
        const findProduct = products.findIndex((produto) => produto.id === id);
        products[findProduct] = content;
    
        res.status(200).json({message: "Produto atualizado com sucesso!"});
    })

// DELETE 

routes.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const produto = products.find((produto) => produto.id === id);

   if (!produto) {
    return res.status(400).json({"message":"Produto não encontrado"})
   }
   products = products.filter((produto) => produto.id !== id);
    
   res.status(200).json(products);
});

// GET 
routes.get('/', (req,res) =>{
    res.status(200).json(products);
})

routes.get("/:id", (req, res) =>{
    const id = Number(req.params.id);

    const details = req.params.details || 'Sem descrição.';
    console.log(details);

    const nome = req.params.nome;
    console.log(nome)

    const product = products.find((produto) => produto.id === id)

    res.status(200).json(product);
    
})

module.exports = routes;