import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { json } from 'body-parser';
import bodyParserMiddleware from './middlewares/bodyParserMiddleware';
import * as helmet from 'helmet';

createConnection()
    .then(async (connection) => {
        const app = express();
        const port = process.env.PORT || 3000;

        // Registering middlewares
        app.use(helmet());
        app.use(json());
        app.use(bodyParserMiddleware);

        app.get('/', (req, res) => {
            res.send({ message: 'Serving from express' });
        });

        // This middleware catches all
        // the non registered routes
        app.use((req, res) => res.status(404).send({}));

        app.listen(port, () => {
            console.log(`Listenging on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
