import XLSX from "xlsx";

export class ExcelHelper {
  static readExcel(filePath: string, sheetName: string) {
    let workbook = XLSX.readFile(filePath);
    let sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json<Record<string, string>>(sheet!, {
      defval: "",
    });
  }
}
