import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { font } from './Times New Roman-normal';

export const convertToPDF = (pdfElement) => {
  try {
    html2canvas(pdfElement, { scrollY: -window.scrollY, scale: 1 }).then((canvas) => {
      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const dateLocal = new Date(now.getTime() - offsetMs);
      const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, '/').replace('T', ' ');
      const imgData = canvas.toDataURL('image/png');

      var imgWidth = 210;
      var pageHeight = 295; // độ cao này chuẩn 1 trang pdf rồi

      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var position = 0;

      console.log({ imgWidth, imgHeight });
      const pdf = new jsPDF('p', 'mm');

      pdf.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

      // pdf.output('dataurlnewwindow');

      pdf.save('download' + str + '.pdf');
    });

    // const doc = new jsPDF({ unit: 'pt' });
    // doc.addFileToVFS('Times New Roman.ttf', font);
    // doc.addFont('Times New Roman.ttf', 'Times New Roman', 'normal');
    // doc.setFont('Times New Roman');

    // doc.html(pdfElement, {
    //   callback: (pdf) => {
    //     //callback after finish if needed
    //     //save option
    //     pdf.save('divpdf.pdf');
    //     console.log('Converted div PDF');
    //   },
    //   margin: 32, // optional: page margin
    //   // optional: other HTMLOptions
    // });

    return { message: 'Finished' };
  } catch (err) {
    console.log(err);
    return { message: 'Failed' };
  }
};
