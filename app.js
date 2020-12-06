import express from 'express';
//import bodyParser from 'body-parser';
import bankRoutes from './routes/banks.js';
import adminRoutes from './routes/admin.js';


const app = express();
const PORT = 3000;
const baseRoute = '/api/v1';

app.use(express.json( {limit: '50mb'} ));
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(`${baseRoute}/banks`, bankRoutes);
app.use('/admin/banks', adminRoutes);


app.get('/', (req, res) => {
    res.send('THIS IS FROM THE SERVER');
});

app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
});