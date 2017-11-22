module.exports = require('cqrs-domain').defineEvent({
  name: 'productCreated'
}, function (data, aggregate) {
  console.log('[DOMAIN][PRODUCT] productCreated');
  aggregate.set(data);
});