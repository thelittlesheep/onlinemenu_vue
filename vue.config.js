module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
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
