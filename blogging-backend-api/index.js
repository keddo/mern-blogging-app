import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import ConnectDB from './db/connection.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors())
server.use(morgan('dev'))
server.use('/api/auth', authRoutes);
// Connect to DB
ConnectDB(process.env.MONGO_DB_URI).then(() => {
    console.log('Connected to MONGODB.')
}).catch( err => {
    console.log(`Can't connect to db: ${err}`);
});

let PORT = 3000;
server.listen(PORT, () => {
    console.log('Listening on port -> ', PORT)
});