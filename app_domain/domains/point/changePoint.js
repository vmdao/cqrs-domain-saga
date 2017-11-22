module.exports = require('cqrs-domain').defineCommand({
  name: 'changePoint'
}, function (data, aggregate) {
  aggregate.apply('pointChanged', data);
});