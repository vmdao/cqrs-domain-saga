module.exports = require('cqrs-domain').defineCommand({
  name: 'deletePoint'
}, function (data, aggregate) {
  aggregate.apply('pointDeleted', data);
});