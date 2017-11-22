module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'bidCreated',
  id: 'payload.id'
}, 'create');