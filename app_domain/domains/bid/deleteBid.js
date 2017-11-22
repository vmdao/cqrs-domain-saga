module.exports = require('cqrs-domain').defineCommand({
  name: 'deleteBid'
}, function (data, aggregate) {
  aggregate.apply('bidDeleted', data);
});