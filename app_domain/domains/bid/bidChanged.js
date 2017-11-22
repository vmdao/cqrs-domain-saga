module.exports = require('cqrs-domain').defineEvent({
  name: 'bidChanged'
},
function (data, aggregate) {
  aggregate.set(data);
});