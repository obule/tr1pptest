const devConfig = {
  MONGO_URL: 'mongodb://localhost/tr1ppdb',
  JWT_SECRET: 'promiseizuagbala',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/tr1ppdb-test',
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/tr1ppdb-prod',
};

const defaultConfig = {
  PORT: process.env.PORT || 4000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;

    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
