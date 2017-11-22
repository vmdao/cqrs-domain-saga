module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'pointDeleted',
  id: 'payload.id'
}, 'delete');