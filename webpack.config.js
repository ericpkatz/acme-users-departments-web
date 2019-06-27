module.exports = {
  devtool: 'source-maps',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
};
