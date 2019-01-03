const express = require('express');
const next = require('next');
const GraphQLHTTP = require('express-graphql');
const mongoClient = require('mongodb').MongoClient;
const { makeExecutableSchema } = require('graphql-tools');

const mngdb = require('./db');
const _schema = require('./data/schema');
const { typeDefs, getResolver } = require('./data/schema_sdl');

const port = parseInt(process.env.PORT, 10) || 8000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });

const handle = app.getRequestHandler();

let db; 

(async () => {
    try {
     await app.prepare();
     const server = express();
    
     // connecting to mongodb 
     const client = await mongoClient.connect(mngdb.MONGO_URL, mngdb.options);
     db = client.db('singhmongo');

     // getting GraphQL schema
     const resolvers = getResolver(db);

     const executableSchema = makeExecutableSchema({
         typeDefs,
         resolvers
     });


     server.use('/graphql', GraphQLHTTP({
        schema: executableSchema,
        graphiql: true
    }));

    server.get('/r/:id', (req, res) => {
        const actualPage = '/resource';
        const queryParams = {
            title: req.params.id
        };
        
        app.render(req, res, actualPage, queryParams)
    })
    server.get('/s/:id', (req, res) => {
        const actualPage = '/show';
        const queryParams = {
            id: req.params.id
        };
        
        app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, err => {
        if(err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    });
}catch(ex) {
    console.error(ex.stack)
    process.exit(1)
}

})();

