module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'bidChanged',
  id: 'payload.id'
}, 'update');