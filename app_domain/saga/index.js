const messageBus = require('../messagebus'),
    config = require('../config');

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
//configurate saga
var saga = require('cqrs-saga')({
    sagaPath: __dirname ,
    sagaStore: {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        dbName: 'domain-saga-product',
        collectionName: 'sagas',
        timeout: 10000
    },
    revisionGuardStore: {
        queueTimeout: 1000, // optional, timeout for non-handled events in the internal in-memory queue
        queueTimeoutMaxLoops: 3, // optional, maximal loop count for non-handled event in the internal in-memory queue

        type: 'mongodb',
        host: 'localhost', // optional
        port: 27017,
        dbName: 'revision-domain-saga-product',
        collectionName: 'sagas',
        prefix: 'readmodel-saga-product-revision', // optional
        timeout: 10000, // optional
    }
});

saga.defineEvent({
    name: 'event',
    aggregateId: 'payload.id',
    aggregate: 'aggregate.name',
    payload: 'payload',
    revision: 'head.revision',
    meta: 'meta'
});

saga.defineCommand({
    id: 'id',
    meta: 'meta'
});

var denormalizer = require('cqrs-eventdenormalizer')(options);

denormalizer.defineEvent({
    correlationId: 'commandId',
    id: 'id',
    name: 'event',
    aggregateId: 'payload.id',
    aggregate: 'aggregate.name',
    payload: 'payload',
    revision: 'head.revision',
    meta: 'meta'
}, );

denormalizer.init(function (err) {
    if (err) {
        console.error(err);
    }

    saga.init(function (err) {
        if (err) {
            return console.error(err);
        }

        messageBus.onEvent(function (evt) {
            console.info('\n[SAGE][EVENT] received event ' + evt.event + ' from redis:\n', evt);
            console.info('\n[SAGE][EVENT] -> handle event ' + evt.event);
            denormalizer.handle(evt, (errs) => {
                if (errs) {
                    console.error(errs);
                }
            });
        });

        saga.onCommand(function (cmd) {
            console.info('[SAGE][COMMAND] ' + cmd.command);
            messageBus.emitCommand(cmd);
        })

        saga.onEventMissing(function (info, evt) {
            console.warn('\n Missed event ' + evt.event + ':');
            console.warn(evt);
            console.warn(info);
        });

        denormalizer.defaultEventExtension((evt, callback) => {
            saga.handle(evt, (err) => {
                callback(err, evt);
            });
        });

        console.log('[SAGA] Started Service');
    });
});