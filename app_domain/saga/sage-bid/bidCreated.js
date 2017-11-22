module.exports = require('cqrs-saga').defineSaga({
    name: 'bidCreated',
    aggregate: 'bid',
    containingProperties: ['payload.id'],
    id: 'payload.id',
}, function (evt, saga, callback) {
    const id = evt.payload.id;
    const bidRepo = require('../../viewBuilders/bid/collection');
    bidRepo.findViewModels({
        'bid.id': id
    }, (err, models) => {
        models.forEach(function (entry) {
            const cmd = {
                command: 'changePoint',
                aggregate: {
                    name: 'point'
                },
                payload: {
                    id: entry.id,
                    text:'hello'
                }
            };
            saga.addCommandToSend(cmd);
        });
        saga.commit(callback);
    });

});