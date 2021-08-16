// config/prod.env.js
module.exports = {
  NODE_ENV: '"production"',
  DEBUG_MODE: false,
  API_KEY: '"..."' // this is shared between all environments
}

// config/dev.env.js
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true // this overrides the DEBUG_MODE value of prod.env
})

// config/test.env.js
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})