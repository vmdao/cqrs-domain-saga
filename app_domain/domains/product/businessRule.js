module.exports = require('cqrs-domain').defineBusinessRule({
  name: 'checkForError'
}, (changed, previous, events, command) => {
  console.log('[DOMAIN][PRODUCT] business rule');
});