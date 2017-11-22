const config = require('./config');
const messageBus = require('./messagebus');
const options = {
    denormalizerPath: __dirname + '/viewBuilders',
    repository: {
        host: config.mongodb.host,
        type: 'mongodb', //'mongodb',
        dbName: 'store'
    },
    revisionGuardStore: {
        host: config.mongodb.host,
        type: 'mongodb', //'mongodb',
        dbName: 'store'
    }
}
let eventDenormalizer = require('cqrs-eventdenormalizer')(options);

eventDenormalizer.defineEvent({
    correlationId: 'commandId',
    id: 'id',
    name: 'event',
    aggregateId: 'payload.id',
    payload: 'payload',
    revision: 'head.revision'
});

eventDenormalizer.init(function (err) {
    if (err) {
        console.log(err);
    }

    messageBus.onEvent(function (data) {
        console.log('[DENORMALIZER][EVENT] denormalize event ' + data.event);
        eventDenormalizer.handle(data);
    });

    eventDenormalizer.onEvent(function (evt) {
        console.log('[DENORMALIZER][EVENT] publish event ' + evt.event + ' to browser');
    });
    console.log('start');
}); 

setTimeout(() => {
    messageBus.emitCommand({
        id: 'msg5',
        command: 'createPoint',
        payload: {
            text: "Helloooooooooo 123"
        }
    });
}, 1000)

// setTimeout(() => {
//     messageBus.emitCommand({
//         id: 'msg5',
//         command: 'productCreate',
//         payload: {
//             text: "Helloooooooooo product"
//         }
//     });
// }, 1000)

// setTimeout(() => {
//     messageBus.emitCommand({
//         id: 'msg5',
//         command: 'create',
//         payload: {
//             text: "Helloooooooooo oooo1"
//         }
//     });
// }, 1000)