module.exports = require('cqrs-domain').defineAggregate({
  // optional, default is last part of path name
  name: 'bid',
  
  // optional, default ''
  defaultCommandPayload: 'payload',
  
  // optional, default ''
  defaultEventPayload: 'payload'
});