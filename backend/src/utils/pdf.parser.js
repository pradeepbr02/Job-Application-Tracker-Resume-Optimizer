import { PDFParse } from 'pdf-parse'
import fs from 'fs'

export const parsePDF = async (filePath) => {
 const parser = new PDFParse({ url: filePath });
const result = await parser.getText();
console.log(result.text);
return result.text
}
