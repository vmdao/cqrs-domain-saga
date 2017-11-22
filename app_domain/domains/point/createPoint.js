module.exports = require('cqrs-domain').defineCommand({
  name: 'createPoint'
}, function (data, aggregate) {
  console.log('[DOMAIN][POINT] createPoint');
  aggregate.apply('pointCreated', data);
});