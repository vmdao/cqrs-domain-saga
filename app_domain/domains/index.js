const config = require('../config'),
    messageBus = require('../messagebus');

let domain = require('cqrs-domain')({
    domainPath: __dirname,
    eventStore: {
        host: config.mongodb.host,
        type: 'mongodb',
        dbName: 'nows',
        eventsCollectionName: 'events',
        snapshotsCollectionName: 'snapshots',
        transactionsCollectionName: 'transactions',
    }
});

domain.defineCommand({
    id: 'id',
    name: 'command',
    aggregateId: 'payload.id',
    aggregate: 'aggregate.name',
    payload: 'payload',
    revision: 'head.revision',
    meta: 'meta'

})

domain.defineEvent({
    correlationId: 'commandId',
    id: 'id',
    name: 'event',
    aggregateId: 'payload.id',
    aggregate: 'aggregate.name',
    payload: 'payload',
    revision: 'head.revision',
    meta: 'meta'

})

domain.init(function (err) {
    if (err) {
        return console.log(err);
    }

    messageBus.onCommand(function (cmd) {
        console.log('[DOMAIN][COMMAND] -> received command ' + cmd.command + ' from redis: \n', cmd);
        console.log('[DOMAIN][COMMAND] -> handle command ' + cmd.command);
        domain.handle(cmd);
    });

    domain.onEvent(function (evt) {
        console.log('[DOMAIN][EVENT] -> push event ' + evt.event);
        messageBus.emitEvent(evt);
    });

    console.log('[DOMAIN] Started Service');
});