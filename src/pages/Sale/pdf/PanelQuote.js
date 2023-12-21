import React, { useRef, useState } from "react";
import { Modal } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Formate, GrandPanelTotal, GrandTotal } from "meta/Reusable/CalcData";
import moment from "moment";

const PanelQuote = ({
  panels,
  estimation,
  handleComplete,
  title,
  disabled=false,
}) => {
  const [pdfSrc, setPdfSrc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // Add a table to the PDF
  const docName = title;

  const doc = new jsPDF();
  const netSubTotal = GrandTotal(estimation, panels);
  const jsPdfData = panels?.map((p, i) => [
    (i + 1).toString(),
    p.name,
    p.qty == 1 ? "No." : "Nos.",
    p.qty?.toString(),
    Formate(GrandPanelTotal(estimation, p).toString()),
    Formate(GrandPanelTotal(estimation, p) * p.qty),
  ]);
  const taxRate = estimation?.tax || 0;
  const salesTax = (Number(netSubTotal) * Number(taxRate)) / 100;
  const grandTotal = Number(netSubTotal) + Number(salesTax);
  const Companylogo = "/assets/images/bilal/logo.png";
  const otherLogos = "/assets/images/bilal/product.png";
  const qrCode = "/assets/images/bilal/qr-code.png";
  const currDate = moment().format("DDDD/MM/YY");
  const address = `Project: ${estimation?.projectName || "***"}`;
  const customerName = `M/s. ${estimation?.customer?.title}`;
  const docId = estimation.cuId;
  const generateInvoice = () => {
    const footerHeight = 10;
    const headerHeight = 40;
    const leftSideSet = 14.3;
    const pageWidth = doc.internal.pageSize.getWidth();
    const header = () => {
      doc.addImage(Companylogo, "PNG", 12, 7, 50, 16);
      doc.addImage(otherLogos, "PNG", pageWidth / 1.81, 7, 80, 16);
    };

    const footer = () => {
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.addImage(
        qrCode,
        "PNG",
        leftSideSet,
        pageHeight - footerHeight - 15,
        20,
        20
      );
      doc.setTextColor("gray");
      doc.setFont("helvetica", "normal");
      doc.setFillColor("#235eba");
      const footerStr = `Page ${doc.internal.getNumberOfPages()}`; // Use total pages here
      doc.setFontSize(10);
      doc.text(
        footerStr,
        doc.internal.pageSize.getWidth() -
          doc.getStringUnitWidth(footerStr) * doc.internal.getFontSize(),
        doc.internal.pageSize.getHeight() - 10
      );
      doc.setFontSize(6);
      doc.setFont("helvetica", "normal");
      doc.text(
        "The aforementioned citation has been generated digitally, and therefore retains its validity even in the absence of a physical signature or stamp",
        35,
        doc.internal.pageSize.getHeight() - 9
      );
    };

    // Content
    const fontSize = 10;
    const padding = 6;
    const textWidth =
      (doc.getStringUnitWidth(docName) * fontSize) / doc.internal.scaleFactor;
    const textHeight = fontSize;
    const rectWidth = textWidth + padding * 8;
    const rectHeight = textHeight - 1;
    const x = (doc.internal.pageSize.getWidth() - rectWidth) / 2;
    const y = headerHeight + 10 + fontSize / 2 - padding;
    doc.rect(x, y, rectWidth, rectHeight);

    doc.setDrawColor(0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setFillColor(255, 255, 255);
    const centerX = x + rectWidth / 2;
    const centerY = y + rectHeight / 2 + 1.5;
    doc.text(docName, centerX, centerY, null, null, "center");
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(customerName, leftSideSet, headerHeight);
    doc.setFont("helvetica", "normal");
    doc.text(address, leftSideSet, headerHeight + 5);
    doc.setFont("helvetica", "bold");
    doc.text("Ref:", pageWidth - 47, headerHeight);
    doc.text(docId, pageWidth - 37, headerHeight);
    doc.text("Dated:", pageWidth - 47, headerHeight + 5);
    doc.setFont("helvetica", "normal");
    doc.text(currDate, pageWidth - 35, headerHeight + 5);

    const headerStyle = {
      fillColor: ["#d9dadf"],
      textColor: ["#000000"],
      fontStyle: "bold",
      fontSize: 10,
    };
    const tableOptions = {
      styles: {
        fontSize: 9, // set the font size to 12
      },
    };
    doc.autoTable({
      startY: 65,
      head: [
        ["Sr. #", "Description", "Unit", "Qty.", "Unit Price", "Total Price"],
      ],
      body: jsPdfData,
      headStyles: headerStyle,
      didDrawPage: () => {
        header();
        footer();
      },
      ...tableOptions,
      margin: { top: 35, bottom: footerHeight + 15 },
    });
    const tableHeight = doc.lastAutoTable.finalY;
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    doc.text("Note:", leftSideSet, tableHeight + 5);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Non fillers will incur a 20% tax as per applicable laws and regulations.",
      leftSideSet + 10,
      tableHeight + 5
    );
    doc.setFont("helvetica", "bold");
    doc.text("Net Sub Total:", pageWidth - 68, tableHeight + 5);
    doc.text(`Rs. ${Formate(netSubTotal)}`, pageWidth - 39, tableHeight + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`Tax @${taxRate}%:`, pageWidth - 64, tableHeight + 10);
    doc.text(`Rs. ${Formate(salesTax)}`, pageWidth - 39, tableHeight + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Grand Total:", pageWidth - 69.6, tableHeight + 15);
    doc.text(`Rs. ${Formate(grandTotal)}`, pageWidth - 39, tableHeight + 15);

    const pdfData = doc.output("datauristring");
    setPdfSrc(pdfData);
    setModalVisible(true);
  };

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        disabled={disabled}
        onClick={() => {
          generateInvoice();
          handleComplete(estimation?.estimationStatus);
        }}
      >
        {title}
      </Button>
      <Modal
        title={`${title} Preview`}
        open={modalVisible && pdfSrc}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1200}
        style={{
          top: 20,
        }}
      >
        <iframe
          src={pdfSrc}
          title={`${title} Preview`}
          width="100%"
          height="500px"
        />
      </Modal>
    </>
  );
};

export default PanelQuote;
