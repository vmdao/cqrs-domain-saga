module.exports = require('cqrs-domain').defineBusinessRule({
  name: 'checkForError'
}, (changed, previous, events, command) => {
  if (changed.get('text').toLowerCase().indexOf('error') >= 0) {
    throw new Error('This is just a sample rule!');
  }
});