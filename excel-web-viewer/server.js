const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const setRoutes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Set up routes
setRoutes(app);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});