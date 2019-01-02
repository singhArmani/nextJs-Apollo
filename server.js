const express = require('express');

const next = require('next');

const port = parseInt(process.env.PORT, 10) || 8000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();


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
    })
})
.catch(ex => {
    console.error(ex.stack)
    process.exit(1)
})