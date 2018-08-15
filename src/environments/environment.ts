export const environment = {
    production: false,
    mongo_connection_string: process.env.mongo_connection_string || 'mongodb://localhost:27017', //'mongodb://localhost:27017'
    npm: {
        api: 'https://registry.npmjs.org/'
    }
};