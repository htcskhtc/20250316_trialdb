import express from 'express';
import ExcelController from '../controllers/excelController';

const router = express.Router();
const excelController = new ExcelController();

export function setRoutes(app) {
    router.get('/', (req, res) => {
        res.render('index');
    });

    router.get('/data', excelController.fetchData);

    app.use('/', router);
}