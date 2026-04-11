/**
 * PDF text extraction from an in-memory buffer (e.g. multer `req.file.buffer`).
 */
import { PDFParse } from "pdf-parse";

/**
 * @param {Buffer} buffer Raw PDF bytes.
 * @returns {Promise<string>} Concatenated plain text from the PDF.
 */
export const parsePDF = async (buffer) => {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    return data.text;
};
