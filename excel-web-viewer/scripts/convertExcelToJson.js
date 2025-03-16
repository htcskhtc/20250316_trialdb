const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function convertExcelToJson() {
  const workbook = new ExcelJS.Workbook();
  const excelPath = path.join(__dirname, '..', '..', 'UserPassword.xlsx'); // Updated path
  const outputPath = path.join(__dirname, '..', 'src', 'public', 'data', 'users.json');
  
  try {
    await workbook.xlsx.readFile(excelPath);
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

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`Excel data converted to JSON and saved at: ${outputPath}`);
  } catch (error) {
    console.error('Error converting Excel to JSON:', error);
  }
}

convertExcelToJson();