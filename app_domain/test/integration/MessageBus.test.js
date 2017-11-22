const MessageBus = require('../../messagebus');

describe('MESSAGEBUS', () => {
    before(() => {
        MessageBus.onCommand(function (message) {
            console.log('onEvent ', 1, message)
        })
    })
    it('It run messagebus', () => {
        MessageBus.emitCommand({
            a: 1
        })
    })
})
