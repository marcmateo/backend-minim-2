module.exports = {
    port: process.env.PORT || 3001, //3001 by default
    db: process.env.MONGODB || 'mongodb://localhost:27017/stations',
    SECRET_TOKEN: 'miclavedetokens'
}