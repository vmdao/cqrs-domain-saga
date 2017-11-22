module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'pointCreated',
  id: 'payload.id'
}, 'create');