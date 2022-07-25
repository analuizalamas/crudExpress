const express = require("express");

const app = express();

let products = require("./produtos");

app.use(express.json());
app.use(express.json());

// POST

app.post('/produtos', (req, res) => {
    const content = req.body;
  
    products = [...products, content];
  
    res.status(201).json(products);

});

// PUT

app.put('/produtos/:id', (req,res) => {
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

app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((produto) => produto.id === id);

   if (!product) {
    return res.status(400).json({"message":"Produto não encontrado"})
   }
   products = products.filter((produto) => produto.id !== id);
    
   res.status(200).json(products);
});

// GET 
app.get('/produtos', (req,res) =>{
    res.status(200).json(products);
})

app.get("/produtos/:id", (req, res) =>{
    const id = Number(req.params.id);

    const details = req.params.details || 'Sem descrição.';
    console.log(details);

    const nome = req.params.nome;
    console.log(nome)

    const product = products.find((produto) => produto.id === id)

    res.status(200).json(product);
    
})

// SERVER

app.listen(3001, () => console.log("Servidor Online"));