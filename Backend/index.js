
const express = require('express');
const productsAPI = require('./productsAPI');
const productDetailAPI = require('./productDetailAPI');

const app = express();
const port = 5000;

// Middleware for JSON parsing
app.use(express.json());

// Endpoint to get all products
app.get('/products', async (req, res) => {
    try {
        const products = await productsAPI.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Endpoint to get product detail by ID
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productDetailAPI.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
