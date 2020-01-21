const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'canvas-d.js',
    library: "CanvasUtils",
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};