module.exports = {
  servers: {
    one: {
      host: '104.236.35.196',
      username: 'root'
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'light-server',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://servethelight.com',
      MONGO_URL: 'mongodb://light:chuspon@ds119748.mlab.com:19748/lightdb'
    },
    ssl: {
      // Enables let's encrypt (optional)
      autogenerate: {
        email: 'caleb.lenoir@gmail.com',
        domains: 'servethelight.com,www.servethelight.com' // comma seperated list of domains
      }
    },

    //dockerImage: 'kadirahq/meteord'
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  }
};
