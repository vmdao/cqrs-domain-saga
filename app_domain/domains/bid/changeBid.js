module.exports = require('cqrs-domain').defineCommand({
  name: 'changeBid'
}, function (data, aggregate) {
  aggregate.apply('bidChanged', data);
});