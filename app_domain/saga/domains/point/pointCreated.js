module.exports = require('cqrs-saga').defineSaga({
    name: 'pointCreated',
    aggregate: 'point',
    containingProperties: ['payload.id'],
    id: 'payload.id',
}, function (evt, saga, callback) {
    const id = evt.payload.id;
    console.log('[SAGA][POINT] pointCreated')
    callback();
});