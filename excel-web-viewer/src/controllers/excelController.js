class ExcelController {
    constructor(excelService) {
        this.excelService = excelService;
    }

    async fetchData(req, res) {
        try {
            const data = await this.excelService.readExcelFile('UserPassword.xlsx');
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error reading Excel file', error: error.message });
        }
    }
}

module.exports = ExcelController;