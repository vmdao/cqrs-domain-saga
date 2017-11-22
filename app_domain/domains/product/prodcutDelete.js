module.exports = require('cqrs-domain').defineCommand({
  name: 'productDeleted'
}, function (data, aggregate) {
  aggregate.apply('productDeleted', data);
});