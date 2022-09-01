export interface IWorkbook {
  SheetNames: string[];
  Sheets: Record<string, any>;
}
