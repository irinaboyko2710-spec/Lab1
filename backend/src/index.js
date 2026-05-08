const express = require('express');
const cors = require('cors'); 
const incidentRoutes = require('./routes/incidents.routes');
const userRoutes = require('./routes/users.routes');
const logger = require('./middleware/request-logging');
const errorHandler = require('./middleware/error-handler');
const { initDb } = require('./db/initDb');
const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
})); 
app.use(express.json()); 
app.use(logger);       
app.use('/api/v1/incidents', incidentRoutes);
app.use('/api/v1/users', userRoutes);
app.use(errorHandler); 
const PORT = 3000;
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`\nСервер запущено на порту ${PORT}`);
        console.log(`API v1 готове: http://localhost:${PORT}/api/v1/incidents`);
    });
}).catch(err => {
    console.error('Помилка бази даних!', err);
});