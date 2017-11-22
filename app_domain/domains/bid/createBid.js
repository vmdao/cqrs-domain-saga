module.exports = require('cqrs-domain').defineCommand({
  name: 'createBid'
}, function (data, aggregate) {
  aggregate.apply('bidCreated', data);
});