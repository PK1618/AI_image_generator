import express from 'express'; //As the primary framework for building the backend server and API.
import * as dotenv from 'dotenv'; //For managing environment variables securely and flexibly.
import cors from 'cors'; //For enabling Cross-Origin Resource Sharing (CORS) for API endpoints. Allowing frontend and backend on different domains to communicate.

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
        res.send('Hello, from PK!');
});

const startServer = async () => {
        try {
                connectDB(process.env.MONGODB_URI);
                app.listen(8080, () => console.log('Server is running on port 8080'));
        } catch (error) {
                console.log(error)
        }

}

startServer();