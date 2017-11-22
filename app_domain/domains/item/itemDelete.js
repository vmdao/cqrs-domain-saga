module.exports = require('cqrs-domain').defineCommand({
  name: 'itemDelete'
}, function (data, aggregate) {
  aggregate.apply('itemDeleted', data);
});