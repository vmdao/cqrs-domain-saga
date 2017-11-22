const redis = require('redis'),
    eventSub = redis.createClient(),
    eventPub = redis.createClient(),
    commandSub = redis.createClient(),
    commandPub = redis.createClient();

let cmdSubscriptions = [],
    evtSubscriptions = [];

// Init Event 

[{
    name: 'eventSub',
    actor: eventSub
}, {
    name: 'eventPub',
    actor: eventPub
}, {
    name: 'commandSub',
    actor: commandSub
}, {
    name: 'commandPub',
    actor: commandPub
}].forEach(({
    name,
    actor
}) => {
    actor.on('connect', () => {
        console.log('[MessageBus][' + name + '] connected')
    });

    actor.on('error', (err) => {
        console.log('[MessageBus][' + name + '] error', err)
    });

    actor.on('warning', (warning) => {
        console.log('[MessageBus][' + name + '] warning', warning)
    });

    actor.on('end', () => {
        console.log('[MessageBus][' + name + '] end')
    });
})

commandSub.on('message', (channel, message) => {
    let messageObject = JSON.parse(message);

    if (channel === 'commands') {
        console.log('[MessageBus][CommandSub] received ' + messageObject.command + ' from redis:\n', messageObject);

        cmdSubscriptions.forEach(function (subscriber) {
            subscriber(messageObject);
        });
    }

})

eventSub.on('message', (channel, message) => {
    let messageEvent = JSON.parse(message);

    if (channel === 'events') {
        console.log('[MessageBus][EventSub] received ' + messageEvent.event + ' from redis: \n', messageEvent);

        evtSubscriptions.forEach(function (subscriber) {
            subscriber(messageEvent);
        });
    }
})

module.exports = {
    onCommand: (callback) => {

        if (cmdSubscriptions.length === 0) {
            commandSub.subscribe('commands');
        }
        cmdSubscriptions.push(callback);
        console.log('[MessageBus][CommandSub] subscribers: ' + cmdSubscriptions.length);
    },
    emitCommand: (commandMessage) => {
        console.log('[MessageBus][CommandPub] publish', commandMessage);
        commandPub.publish('commands', JSON.stringify(commandMessage));
    },

    onEvent: (callback) => {
        if (evtSubscriptions.length === 0) {
            eventSub.subscribe('events');
        }
        evtSubscriptions.push(callback);
        console.log('[MessageBus][EventSub] subscribers: ' + evtSubscriptions.length);
    },

    emitEvent: (eventMessage) => {
        console.log('[MessageBus][EventPub] publish', eventMessage);
        eventPub.publish('events', JSON.stringify(eventMessage));
    }
};