module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'cards'
    },
    binary: {
      version: '4.0.2', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false,
    debug: false
  }
};