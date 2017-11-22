const redis = require('redis');
var event = redis.createClient(),
    command = redis.createClient();

var cmdSubscriptions = [],
    evtSubscriptions = [];

// Init Event 

event.on('connect', () => {
    console.log('[MessageBus][Event] connected')
});

event.on('error', (err) => {
    console.log('[MessageBus][Event] error', err)
});

event.on('warning', (warning) => {
    console.log('[MessageBus][Event] warning', warning)
});

event.on('end', () => {
    console.log('[MessageBus][Event] end')
});

command.on('connect', () => {
    console.log('[MessageBus][Command] connected')
});

command.on('error', (err) => {
    console.log('[MessageBus][Command] error', err)
});

command.on('warning', (warning) => {
    console.log('[MessageBus][Command] warning', warning)
});

command.on('end', () => {
    console.log('[MessageBus][Command] end')
});

// Event import

command.on('message', (channel, message) => {
    let messageObject = JSON.parse(message);

    if (channel === 'commands') {
        console.log('[MessageBus][Command] received ' + messageObject.command + ' from redis:\n', messageObject);

        cmdSubscriptions.forEach(function (subscriber) {
            subscriber(messageObject);
        });
    }

})

event.on('message', (channel, message) => {
    let messageEvent = JSON.parse(message);

    if (channel === 'events') {
        console.log('[MessageBus][Event] received ' + messageEvent.event + ' from redis: \n', messageEvent);

        evtSubscriptions.forEach(function (subscriber) {
            console.log(subscriber, 123)
            subscriber(messageEvent);
        });
    }
})

module.exports = {
    onCommand: (callback) => {

        if (cmdSubscriptions.length === 0) {
            command.subscribe('commands');
        }
        cmdSubscriptions.push(callback);
        console.log('[MessageBus][Command] subscribers: ' + cmdSubscriptions.length);
    },
    emitCommand: (commandMessage) => {
        console.log('[MessageBus][Command] publish', commandMessage);
        command.publish('commands', JSON.stringify(commandMessage));
    },

    onEvent: (callback) => {
        if (evtSubscriptions.length === 0) {
            event.subscribe('events');
        }
        evtSubscriptions.push(callback);
        console.log('[MessageBus][Event] subscribers: ' + evtSubscriptions.length);
    },

    emitEvent: (eventMessage) => {
        console.log('[MessageBus][Event] publish', eventMessage);
        console.log(typeof evtSubscriptions[0])
        event.publish('events', JSON.stringify(eventMessage));
    }
};