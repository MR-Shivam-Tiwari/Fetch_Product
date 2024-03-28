const axios = require('axios');

async function getAllProducts() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products?limit=20'); // Limit set to 50
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts
};
