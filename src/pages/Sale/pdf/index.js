import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Formate,
  GrandPanelTotal,
  GrandTotal,
  Rs,
} from "meta/Reusable/CalcData";
import moment from "moment";

const PdfGenerator = ({ panels, estimation }) => {
  const NetSubTotal = GrandTotal(estimation, panels);
  const jspdfData = panels.map((p, i) => [
    (i + 1).toString(),
    p.name,
    p.qty == 1 ? "No." : "Nos.",
    p.qty.toString(),
    Formate(GrandPanelTotal(estimation, p).toString()),
    Formate(GrandPanelTotal(estimation, p) * p.qty),
  ]);
  const customerName = `M/s. ${estimation?.customer?.title}`;
  const Address = "Project: *** ";
  const CuId = estimation.cuId;
  const Docdate = moment().format("DD/MM/YY");
  const header = "Quotation";

  const generatePdf = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const imageUrl = "/assets/images/bilal/logo.png";
    doc.addImage(imageUrl, "PNG", 7, 7, 50, 20);
    const imageUrl2 = "/assets/images/bilal/product.png";
    doc.addImage(imageUrl2, "PNG", pageWidth / 1.81, 7, 80, 20);

    // Add header to the PDF
    const headerHeight = 40;
    doc.setFontSize(17);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#235eba");
    doc.text(header, pageWidth / 2, headerHeight + 19, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(customerName, 10, headerHeight);
    const secondText = Address;
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");

    doc.text(secondText, 10, headerHeight + 5);

    // Add some text to the PDF
    const rightText1 = "Ref:";
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(rightText1, pageWidth - 47, headerHeight);
    const rightText1Part2 = CuId;
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(rightText1Part2, pageWidth - 37, headerHeight);

    const rightText2 = "Dated:";
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(rightText2, pageWidth - 47, headerHeight + 5);

    const rightText2Part2 = Docdate;
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(rightText2Part2, pageWidth - 35, headerHeight + 5);

    const startY = headerHeight + 25;
    const headerStyle = {
      fillColor: ["#235eba"], // Gray background color
      textColor: ["fff"], // Black text color
      fontStyle: "bold", // Bold font style
      fontSize: 10, // Font size
    };
    doc.autoTable({
      head: [
        ["Sr. #", "Description", "Unit", "Qty.", "Unit Price", "Total Price"],
      ],
      body: jspdfData,
      startY: startY,
      headStyles: headerStyle,
    });
    const tableHeight = doc.lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Net Sub Total:  ${Rs(NetSubTotal)}`,
      pageWidth - 70,
      tableHeight + 10
    );

    // Add footer to the PDF
    const footer = "www.bilaleng.com";
    const footerHeight = 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(13);
    doc.setTextColor(50);
    doc.setFillColor("green");
    doc.setFont("helvetica", "normal");
    doc.text(footer, pageWidth / 2, pageHeight - footerHeight, {
      align: "center",
    });
    // Save the PDF to a file and download it
    doc.save(`${header}(${CuId}-${Docdate}).pdf`);
  };

  return (
    <>
      <Button icon={<DownloadOutlined />} onClick={generatePdf}>
        Quotation
      </Button>
    </>
  );
};
