
const axios = require('axios');

async function getProductById(productId) {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getProductById
};
