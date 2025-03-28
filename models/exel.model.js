const ExcelJS = require("exceljs");
const path = require("path");

exports.exportToExcel = async (data, sheetName, fileName) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    if (data.length === 0) {
      throw new Error("No data available to export");
    }

    // Sarlavhalarni yaratish
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 20,
    }));

    // Ma'lumotlarni qo‘shish
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // Faylni saqlash
    const filePath = path.join(__dirname, "../exports", fileName);
    await workbook.xlsx.writeFile(filePath);

    return filePath;
  } catch (error) {
    throw new Error("Error generating Excel file: " + error.message);
  }
};
