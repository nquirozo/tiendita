const path = require('path');

module.exports = {
  entry: './src/application/ProductController.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};