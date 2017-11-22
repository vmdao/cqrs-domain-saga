module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'productChanged',
  id: 'payload.id'
}, 'update');