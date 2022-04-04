var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    description: String
});

var Product = mongoose.model('Product', productSchema, "product");
module.exports = Product;