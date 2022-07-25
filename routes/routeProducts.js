const express = require('express');

const routes = express.Router();

let products = require("../app");

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

routes.put('/:id', (req,res) => {
    const id = Number(req.params.id);
    const content = req.body;

    const product = products.find((produto) => produto.id === id);

    if (!product) {
        res.status(400).json({"message":"Produto não encontrado"})
    }

    const uptadeProduct = products.map((produto) =>{
        if(produto.id === id) return content;

        return produto;
    })
        products = uptadeProduct;

        res.status(200).json(products)
    });
   

// DELETE 

routes.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((produto) => produto.id === id);

   if (!product) {
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