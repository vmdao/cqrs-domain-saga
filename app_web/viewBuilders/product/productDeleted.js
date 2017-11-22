module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'productDeleted',
  id: 'payload.id'
}, 'delete');