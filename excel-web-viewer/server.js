const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const setRoutes = require('./src/routes/index');
const ExcelService = require('./src/services/excelService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'src/public/data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Convert Excel to JSON on server start
const excelService = new ExcelService('../UserPassword.xlsx');
excelService.readExcelFile()
    .then(data => {
        fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(data, null, 2));
        console.log('Excel data converted to JSON successfully.');
    })
    .catch(err => {
        console.error('Error converting Excel to JSON:', err);
    });

// Set up routes
setRoutes(app);

// Add route to root directory for index.html
app.use(express.static(path.join(__dirname, '..')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`View Excel data at http://localhost:${PORT}/index.html`);
});