import { jsPDF } from 'jspdf';


export const convertToPDF = (pdfHTMLElement) => {
  try {
    const doc = new jsPDF({ unit: 'pt' });
    doc.html(pdfHTMLElement, {
      callback: (pdf) => {
        //callback after finish if needed
        //save option
        pdf.save('divpdf.pdf');
        console.log('Converted div PDF');
      },
      margin: 32, // optional: page margin
      // optional: other HTMLOptions
    });
    return { message: 'Finished' };
  } catch (err) {
    console.log(err);
    return { message: 'Failed' };
  }
};
