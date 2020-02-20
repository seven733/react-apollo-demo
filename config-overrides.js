module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config.resolve = {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    alias: {
      '@': `${__dirname}/src/`,
      'assert': `${__dirname}/src/assert/`,
      'pages': `${__dirname}/src/pages/`,
      'components': `${__dirname}/src/components/`
    }
  };
  config.optimization = {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
        },
        ramda: {
          test: /node_modules\/ramda\//, // ramda库单独打包
          name: 'vender-ramda'
        },
        default: {
          minSize: 0,
          minChunks: 2,
          reuseExistingChunk: true,
          name: 'utils'
        }
      },
    },
  };
  return config;
}
