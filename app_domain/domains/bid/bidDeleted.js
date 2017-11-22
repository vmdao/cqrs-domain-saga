module.exports = require('cqrs-domain').defineEvent({
  name: 'bidDeleted'
},
function (data, aggregate) {
  aggregate.destroy();
});