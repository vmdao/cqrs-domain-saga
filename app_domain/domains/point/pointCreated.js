module.exports = require('cqrs-domain').defineEvent({
  name: 'pointCreated'
}, function (data, aggregate) {
  console.log('[DOMAIN][POINT] pointCreated');
  aggregate.set(data);
});