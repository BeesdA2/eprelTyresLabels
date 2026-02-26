 
const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');
const SVGtoPDF = require('svg-to-pdfkit');
const https = require('https');

async function generatePDF(req, res ) {
	
 

  let setletter = req.query.setletter; 
  let filiaal = req.query.filiaal;
  let ordernummer = req.query.ordernummer;
  let orderregel = req.query.orderregel;
  let orderseqn = req.query.orderseqn; 
  let orderprtn = req.query.orderprtn; 
  let eprelLabelID = req.query.eprelLabelID;   
  let eprelURL     = req.query.eprelURL;
  
  // https://eprel.ec.europa.eu/labels/tyres/Label_479388.svg
   
   let pdfNaam =  ordernummer + ' onderdeel ' + orderprtn + ' eprelLabelID ' + eprelLabelID + '.pdf';
   console.log('pdfNaam: ' +pdfNaam  );
   
   let filePath = '../../../../../volvo/upload/' + setletter + '/' + filiaal+ '/AfterSales/' +pdfNaam;
  
  // Haal de SVG op van de URL
  try {
  const response =  await axios({
        method: 'get',
        url: url,
        responseType: 'text',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/png,image/svg'
        }
    });

  
  const svgData = response.data;

  const doc = new PDFDocument({ size: 'A4' });
  doc.pipe(fs.createWriteStream(filePath));

  // Bepaal de afmetingen voor de vier kwadranten
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // Voeg de vier kwadranten toe
 // doc.rect(0, 0, pageWidth / 2, pageHeight / 2).stroke();
 // doc.rect(pageWidth / 2, 0, pageWidth / 2, pageHeight / 2).stroke();
 // doc.rect(0, pageHeight / 2, pageWidth / 2, pageHeight / 2).stroke();
 // doc.rect(pageWidth / 2, pageHeight / 2, pageWidth / 2, pageHeight / 2).stroke();

  // Zet de SVG om naar een formaat dat PDFKit kan begrijpen en voeg het toe in het linkerbovenkwadrant
   SVGtoPDF(doc, svgData, 0, 0, { width: pageWidth / 0.5, height: pageHeight / 0.5 });
   console.log('SVGtoPDF: ' +eprelURL  );
  doc.end();
  
  } catch (err) {
  console.error("EPREL definitief mislukt:", err.code, err.message);
}
}




//generatePDF();

module.exports = {
  generatePDF: generatePDF
  };
