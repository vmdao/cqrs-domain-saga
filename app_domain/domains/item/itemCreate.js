module.exports = require('cqrs-domain').defineCommand({
  name: 'itemCreate'
}, function (data, aggregate) {
  console.log('[DOMAIN][ITEM] itemCreate');
  aggregate.apply('itemCreated', data);
});