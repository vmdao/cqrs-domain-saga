module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'productCreated',
  id: 'payload.id'
}, 'create');