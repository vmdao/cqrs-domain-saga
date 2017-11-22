module.exports = require('cqrs-domain').defineCommand({
  name: 'productChange'
}, function (data, aggregate) {
  aggregate.apply('productChanged', data);
});