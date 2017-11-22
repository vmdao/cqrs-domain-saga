module.exports = require('cqrs-domain').defineCommand({
  name: 'productCreate'
}, function (data, aggregate) {
  console.log('[DOMAIN][PRODUCT] productCreate');
  aggregate.apply('productCreated', data);
});