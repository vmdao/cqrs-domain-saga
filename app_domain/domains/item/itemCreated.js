module.exports = require('cqrs-domain').defineEvent({
  name: 'itemCreated'
}, function (data, aggregate) {
  console.log('[DOMAIN][ITEM] itemCreated');
  aggregate.set(data);
});