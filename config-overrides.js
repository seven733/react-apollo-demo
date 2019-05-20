module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve = {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    alias: {
      '@': `${__dirname}/src/`,
      'assert': `${__dirname}/src/assert/`,
      'pages': `${__dirname}/src/pages/`,
      'components': `${__dirname}/src/components/`
    }
  };
  return config;
}
