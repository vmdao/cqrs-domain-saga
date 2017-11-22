module.exports = require('cqrs-domain').defineEvent({
  name: 'bidCreated'
}, function (data, aggregate) {
  aggregate.set(data);
});