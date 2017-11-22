module.exports = require('cqrs-domain').defineEvent({
  name: 'pointDeleted'
},
function (data, aggregate) {
  aggregate.destroy();
});