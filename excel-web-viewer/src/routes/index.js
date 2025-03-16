const express = require('express');
const ExcelController = require('../controllers/excelController');
const ExcelService = require('../services/excelService');

const router = express.Router();
const excelService = new ExcelService('../../UserPassword.xlsx');
const excelController = new ExcelController(excelService);

function setRoutes(app) {
    router.get('/', (req, res) => {
        res.render('index');
    });

    router.get('/api/data', (req, res) => {
        excelController.fetchData(req, res);
    });

    app.use('/', router);
}

module.exports = setRoutes;