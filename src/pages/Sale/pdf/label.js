import jsPDF from "jspdf";
const qrCode = "/assets/images/bilal/qr-code.png";

const generateLabel = async () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [100, 60], // Set the dimensions of the label
  });

  // Draw the border of the label
  doc.rect(5, 5, 90, 50);

  // Generate the QR code

  // Add the QR code to the label
  doc.addImage(qrCode, "PNG", 15, 15, 30, 30);

  // Add the label text
  doc.setFontSize(12);
  doc.text("Bin Location", 60, 20);
  doc.setFontSize(10);
  doc.text("Bin Number: 123", 60, 30);
  doc.text("Dimensions: 10cm x 20cm x 30cm", 60, 35);

  // Save the label as a PDF file
  doc.save("label.pdf");
};
