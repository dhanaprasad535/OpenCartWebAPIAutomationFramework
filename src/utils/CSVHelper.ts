import fs from "fs";
import { parse } from "csv-parse/sync";

export class CSVHelper {
  static readCsv(filepath: string): Record<string, string>[] {
    return parse(fs.readFileSync(filepath, "utf-8"), {
      skip_empty_lines: true,
      columns: true,
      trim: true,
    }) as Record<string, string>[];
  }
}
