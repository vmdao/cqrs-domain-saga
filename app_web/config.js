module.exports = {
    mongodb: {
        host: process.env.MONGO_HOST || '127.0.0.1',
        port: process.env.MONGO_PORT || 27017,
    },
    redis: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || '127.0.0.1'
    },
    memory: {

    }
}