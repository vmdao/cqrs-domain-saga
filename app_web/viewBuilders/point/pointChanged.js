module.exports = require('cqrs-eventdenormalizer').defineViewBuilder({
  name: 'pointChanged',
  id: 'payload.id'
}, 'update');