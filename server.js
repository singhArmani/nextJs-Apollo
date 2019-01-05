const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const next = require('next');
const mongoClient = require('mongodb').MongoClient;

const mngdb = require('./db');
const { typeDefs, getResolver } = require('./data/schema_sdl');

const port = parseInt(process.env.PORT, 10) || 8000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });

const handle = app.getRequestHandler();

let db; 

(async () => {
    try {
     await app.prepare();
    const expressServer = express();
     // connecting to mongodb 
     const client = await mongoClient.connect(mngdb.MONGO_URL, mngdb.options);
     db = client.db('singhmongo');

     // getting GraphQL schema
     const resolvers = getResolver(db);

     const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        playground: {
            endpoint: `http://localhost:8000/graphql`,
            settings: {
              'editor.theme': 'light'
            }
          }
    });

    expressServer.get('/r/:id', (req, res) => {
        const actualPage = '/resource';
        const queryParams = {
            id: req.params.id
        };
        
        app.render(req, res, actualPage, queryParams)
    })
    expressServer.get('/s/:id', (req, res) => {
        const actualPage = '/show';
        const queryParams = {
            id: req.params.id
        };
        
        app.render(req, res, actualPage, queryParams)
    })



    expressServer.get('*', (req, res) => {
        return handle(req, res);
    });

    apolloServer.applyMiddleware( {app: expressServer});

    expressServer.listen(port, err => {
        if(err) console.log(err);

        console.log({path: apolloServer.graphqlPath})
        console.log(`> Ready on http:localhost:${port}`)
    });

}catch(ex) {
    console.error(ex.stack)
    process.exit(1)
}

})();

