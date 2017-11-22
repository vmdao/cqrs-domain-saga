module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'bidDeleted',
  id: 'payload.id'
}, 'delete');