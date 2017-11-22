module.exports = require('cqrs-domain').defineCommand({
  name: 'itemChange'
}, function (data, aggregate) {
  aggregate.apply('itemChanged', data);
});