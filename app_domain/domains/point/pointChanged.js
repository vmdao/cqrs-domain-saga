module.exports = require('cqrs-domain').defineEvent({
  name: 'pointChanged'
},
function (data, aggregate) {
  aggregate.set(data);
});