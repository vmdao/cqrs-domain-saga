module.exports = require('cqrs-saga').defineSaga({
    name: 'bidCreated',
    aggregate: 'bid',
    containingProperties: ['payload.id'],
    id: 'payload.id',
}, function (evt, saga, callback) {
    callback();
});