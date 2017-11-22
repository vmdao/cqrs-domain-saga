const messageBus = require('../messagebus');
const config = require('../config');
let domain = require('cqrs-domain')({
    domainPath: __dirname,
    eventStore: {
        host: config.mongodb.host,
        type: 'mongodb', //'mongodb',
        dbName: 'nows',
        eventsCollectionName: 'events', // optional
        snapshotsCollectionName: 'snapshots', // optional
        transactionsCollectionName: 'transactions', // optional
    }
});

domain.defineCommand({
    id: 'id',
    name: 'command',
    aggregateId: 'payload.id',
    payload: 'payload',
    revision: 'head.revision'
})

domain.defineEvent({
    correlationId: 'commandId',
    id: 'id',
    name: 'event',
    aggregateId: 'payload.id',
    payload: 'payload',
    revision: 'head.revision'
})

domain.init(function (err) {
    if (err) {
        return console.log(err);
    }
    // on receiving a message (__=command__) from messageBus pass it to 
    // the domain calling the handle function
    messageBus.onCommand(function (cmd) {
        console.log('[DOMAIN][COMMAND] -> received command ' + cmd.command + ' from redis: \n', cmd);
        console.log('[DOMAIN][COMMAND] -> handle command ' + cmd.command);
        domain.handle(cmd);
    });

    // on receiving a message (__=event) from domain pass it to the messageBus
    domain.onEvent(function (evt) {
        console.log('[DOMAIN][EVENT] -> push event ' + evt.event);
        messageBus.emitEvent(evt);
    });

    console.log('[DOMAIN] Started Service');
});
