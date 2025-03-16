class ExcelService {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async readExcelFile() {
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(this.filePath);
        const worksheet = workbook.worksheets[0];
        const data = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { // Skip header row
                const rowData = {
                    username: row.getCell(1).value,
                    password: row.getCell(2).value
                };
                data.push(rowData);
            }
        });

        return data;
    }
}

module.exports = ExcelService;