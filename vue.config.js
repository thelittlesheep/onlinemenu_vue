module.exports = {
  devServer: {
    host: "localhost",
  },
  publicPath: "",
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};
