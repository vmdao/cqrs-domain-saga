module.exports = require('cqrs-domain').defineBusinessRule({
  name: 'checkForError'
}, (changed, previous, events, command) => {
  console.log('[DOMAIN][POINT] business rule');
  if (changed.get('text').toLowerCase().indexOf('error') >= 0) {
    throw new Error('This is just a sample rule!');
  }
});