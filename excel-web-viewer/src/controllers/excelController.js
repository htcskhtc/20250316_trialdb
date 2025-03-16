class ExcelController {
    constructor(excelService) {
        this.excelService = excelService;
        // Bind the method to preserve 'this' context
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(req, res) {
        try {
            const data = await this.excelService.readExcelFile();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error reading Excel file', error: error.message });
        }
    }
}

module.exports = ExcelController;