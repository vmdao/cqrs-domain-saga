module.exports = require('cqrs-domain').defineEvent({
  name: 'productCreate'
},
function (data, aggregate) {
  aggregate.set(data);
});