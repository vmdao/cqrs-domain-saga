const redis = require('redis'),
    commandSub = redis.createClient(),
    commandPub = redis.createClient();

commandSub.on('message', (channel, message) => {
    let messageObject = JSON.parse(message);
    console.log('[MessageBus][Command] received ' + messageObject.command + ' from redis:\n', messageObject);
})


describe('Redis', () => {
    before(() => {
        commandSub.subscribe('commands');
        console.log('llisten');
    })
    it('It run messagebus', (done) => {
        commandPub.publish('commands', JSON.stringify({
            eventMessage: 1
        }));
        setTimeout(done, 1000);
    })
})